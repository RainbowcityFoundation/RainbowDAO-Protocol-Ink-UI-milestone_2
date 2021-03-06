import connectContract from "../../api/connectContract"
import {dealResult, formatResult} from "../../utils/formatUtils"
import Accounts from "../../api/Account.js";
import {eventBus} from "../../utils/eventBus"

const state = {
    web3: {},
    contract: null,
    proposalList:[]
}
const value = 0;
const gasLimit = -1;

async function judgeContract(web3, address) {
    state.contract = await connectContract(web3, "daoProposal", address)
}

const mutations = {
    SET_WEB3(state, web3) {
        state.web3 = web3
    },
    SET_PROPOSALLIST(state, list) {
        state.proposalList = list
    },
}
const actions = {
    async listUser({rootState}, daoUserAddress) {
        const AccountId = sessionStorage.getItem('currentAccount')
        await judgeContract(rootState.app.web3, daoUserAddress)
        let data = await state.contract.query.listUser(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async propose({rootState, dispatch}, {address,title,desc,category,transaction,pendingTime,publicityDelay}) {
        const injector = await Accounts.accountInjector();
        const AccountId = sessionStorage.getItem('currentAccount')
        await judgeContract(rootState.app.web3, address)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        let startBlock = 0

        const lastHeader = await rootState.app.web3.rpc.chain.getHeader();
        startBlock = lastHeader.number
        startBlock= parseInt(startBlock) + parseInt(pendingTime)
        const endBlock = parseInt(startBlock) + parseInt(pendingTime) + parseInt(publicityDelay)

        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        console.log(startBlock,endBlock,transaction,publicityDelay)
        let data = await state.contract.tx.propose({
            value,
            gasLimit
        },title,desc,category,startBlock,endBlock,transaction,publicityDelay).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result, "Create Proposal",timeMemory)
        });
        data = formatResult(data);
        return data
    },
    async listProposals({rootState},address) {
        await judgeContract(rootState.app.web3,address)
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.listProposals(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async state({rootState},{proposalId,address}) {
        await judgeContract(rootState.app.web3,address)
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.state(AccountId, {value, gasLimit}, proposalId)
        data = formatResult(data);
        return data
    },
    async castVote({rootState},{proposal_id,support,proposalAddress}) {
        console.log(proposal_id,support,proposalAddress)
        const injector = await Accounts.accountInjector();
        await judgeContract(rootState.app.web3,proposalAddress)
        if(rootState.app.balance < 1.01){
            eventBus.$emit('message', {
                type:"error",
                message:"Not enough gas"
            })
            return
        }
        const AccountId = sessionStorage.getItem('currentAccount')
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        console.log(proposal_id,support)
        let data = await state.contract.tx.castVote({value, gasLimit},proposal_id,support).signAndSend(AccountId, { signer: injector.signer }, (result) => {
            dealResult(result,"Vote",timeMemory)
        });
        data = formatResult(data);
        return data
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
