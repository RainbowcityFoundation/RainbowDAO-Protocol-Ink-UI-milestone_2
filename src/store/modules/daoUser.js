import connectContract from "../../api/connectContract"
import {dealResult, formatResult} from "../../utils/formatUtils"
import Accounts from "../../api/Account.js";
import {eventBus} from "../../utils/eventBus"
import contractHash from "../../utils/contractHash.json"

const state = {
    web3: {},
    contract: null,
    departmentList:[]
}
const value = 0;
const gasLimit = -1;

async function judgeContract(web3, address) {
    state.contract = await connectContract(web3, "daoUser", address)
}

const mutations = {
    SET_WEB3(state, web3) {
        state.web3 = web3
    },
    SET_DEPARTMENTLIST(state, list) {
        state.departmentList = list
    },
}
const actions = {
    async listUser({rootState}, daoUserAddress) {
        const AccountId = await Accounts.accountAddress();
        await judgeContract(rootState.app.web3, daoUserAddress)
        let data = await state.contract.query.listUser(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async listGroup({rootState}, daoUserAddress) {
        const AccountId = await Accounts.accountAddress();
        await judgeContract(rootState.app.web3, daoUserAddress)
        let data = await state.contract.query.listGroup(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async addGroup({rootState}, {daoUserAddress,department}) {
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();

        await judgeContract(rootState.app.web3, daoUserAddress)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        let obj = {}
        obj[department.manager] = true
        department.users= obj

        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)

        let data = await state.contract.tx.addGroup({
            value,
            gasLimit
        },department.name,department.joinDirectly,department.isOpen,department.manager).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            console.error(result)
            dealResult(result, "Create Department",timeMemory)
        });
        data = formatResult(data);
        return data
    },
    async join({rootState, dispatch}, address) {
        const members = rootState.daoManage.daoMembers
        for (let i=0;i<members.length;i++){
            if(members[i].addr == sessionStorage.getItem("currentAccount")){
                eventBus.$emit('message', {
                    type:"error",
                    message:"You has joined this DAO"
                })
                return
            }
        }
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
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        let data = await state.contract.tx.join({
            value,
            gasLimit
        }).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            console.error(result)
            dealResult(result, "Join DAO",timeMemory)
        });
        data = formatResult(data);
        return data
    },
    async joinGroup({rootState, dispatch}, {address,id}) {
        console.log(address,id)
        const injector = await Accounts.accountInjector();
        console.log(address,id)
        const AccountId = sessionStorage.getItem('currentAccount')

        await judgeContract(rootState.app.web3, address)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        let data = await state.contract.tx.joinGroup({
            value,
            gasLimit
        },id).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result, "Join Department",timeMemory)
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
