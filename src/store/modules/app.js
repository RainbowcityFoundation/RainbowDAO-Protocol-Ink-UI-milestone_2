import {ApiPromise,WsProvider} from "@polkadot/api";
import httpConfig from "../../api/httpConfig"
const state = {
    web3:{},
    isConnected:false,
    balance:0,
    account:""
}
const mutations = {
    SET_WEB3(state,web3){
        state.web3 = web3
        state.isConnected = true

    },
    SET_ACCOUNT(state,account){
        state.account = account
    },
    SET_BALANCE(state, balance){
        state.balance = balance
    }
}
const actions = {
    async getWeb3({commit}){
        const wsProvider = new WsProvider(httpConfig.connectPath);
        const api = await ApiPromise.create({provider: wsProvider});

        const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version()
        ]);
        commit("SET_WEB3", api)
    },
     async getBalance({commit},account){
        if(state.web3.query){
            let { data: balance } = await  state.web3.query.system.account(account);
            return balance.toHuman().free
        }else{
            return 0
        }

     }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
