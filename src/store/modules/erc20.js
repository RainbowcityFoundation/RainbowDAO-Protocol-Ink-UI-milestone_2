import connectContract from "../../api/connectContract"
import {dealResult, formatResult} from "../../utils/formatUtils"
import Accounts from "../../api/Account.js";
import {eventBus} from "../../utils/eventBus"
const state = {
    coinInfo: {},
    myGCBalance:0,
    daoGCBalance:0,
}
const value = 0;
const gasLimit = -1;
async function  judgeContract(web3,coinAddress){
    if(!coinAddress){
        throw new Error("No Addr")
    }

    state.contract = await connectContract(web3, "erc20",coinAddress)
}
const mutations = {
    SET_COIN(state,coin){
        state.coinInfo = coin
    },

    SET_MYGCBALABCE(state,balance){
        state.myGCBalance = balance
    },
    SET_DAOGCBALABCE(state,balance){
        state.daoGCBalance = balance
    },
}
const actions = {
    async transfer({rootState}, {fromAddr,toAddr,amount}){
        const injector = await Accounts.accountInjector();

        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        const txHash = await rootState.app.web3.tx.balances
            .transfer(toAddr, amount)
            .signAndSend(fromAddr, { signer: injector.signer }, (result) => {
                dealResult(result,"Transfer Fee",timeMemory)
            });
    },
    async queryInfo({rootState}, coinAddress) {
        await judgeContract(rootState.app.web3,coinAddress)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.queryInfo(AccountId, {value, gasLimit})
        data = formatResult(data);

        return data
    },
    async getPriorVotes({rootState}, {blockNumber,coinAddress}) {
        await judgeContract(rootState.app.web3,coinAddress)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getPriorVotes(AccountId, {value, gasLimit}, AccountId,blockNumber)
        data = formatResult(data);
        return data
    },
    async getCurrentVotes({rootState},coinAddress) {

        await judgeContract(rootState.app.web3,coinAddress)
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.getCurrentVotes(AccountId, {value, gasLimit}, AccountId)
        data = formatResult(data);
        return data
    },
    async approve({rootState},{address,coinAddress}){
        const injector = await Accounts.accountInjector();
        const AccountId =  sessionStorage.getItem('currentAccount')
        await judgeContract(rootState.app.web3,coinAddress)
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        let data = await state.contract.tx.approve( {value, gasLimit},address,"100000000000000000000000000000000").signAndSend(AccountId, { signer: injector.signer }, (result) => {
            dealResult(result,"Approve", timeMemory)
        });

        data = formatResult(data);
        return data
    },
    async delegate({rootState},{address,coinAddress}){

        const injector = await Accounts.accountInjector();
        const AccountId =  sessionStorage.getItem('currentAccount')
        await judgeContract(rootState.app.web3,coinAddress)

        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        let data = await state.contract.tx.delegate( {value, gasLimit},address).signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isInBlock ||result.status.isFinalized) {
                dealResult(result,"Delegate", timeMemory)

                return true
            }
        });

        data = formatResult(data);
        return data
    },
    async allowance({rootState},{owner,spender,address}){
        await judgeContract(rootState.app.web3, address)
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.allowance(AccountId, {value, gasLimit}, owner,spender)
        data = formatResult(data);
        return data
    },
    async getBalance({rootState},address){
        await judgeContract(rootState.app.web3, address)
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.balanceOf(AccountId, {value, gasLimit}, AccountId)
        data = formatResult(data);
        return data
    },
    async getBalanceOf({rootState}, {address,toAddr}){
        await judgeContract(rootState.app.web3, address)
        const accountList = await Accounts.accountList();
        const AccountId = sessionStorage.getItem('currentAccount')
        let data = await state.contract.query.balanceOf(AccountId, {value, gasLimit}, toAddr)
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
