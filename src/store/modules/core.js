import connectContract from "../../api/connectContract"
import {formatResult,dealResult} from "../../utils/formatUtils"
import Accounts from "../../api/Account.js";
import {eventBus} from "../../utils/eventBus"

const state = {
    web3: {},
    contract: null
}
const value = 0;
const gasLimit = -1;

async function judgeContract(web3) {
    if (!state.contract) {
        state.contract = await connectContract(web3, "core")
    }
}

const mutations = {
    SET_WEB3(state, web3) {
        state.web3 = web3
    }
}
const actions = {
    async roleInsertPrivilege({rootState}, {name, privilege}) {
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        await judgeContract(rootState.app.web3)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        let data = await state.contract.tx.roleInsertPrivilege({
            value,
            gasLimit
        }, name, privilege).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            console.error(result)
            dealResult(result)
        });
        data = formatResult(data);
        return data
    },
    async addPrivilege({rootState}, name) {
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        await judgeContract(rootState.app.web3)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        let data = await state.contract.tx.addPrivilege({
            value,
            gasLimit
        }, name).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result)
        });
        data = formatResult(data);
        return data
    },
    async addRole({rootState}, name) {
        const injector = await Accounts.accountInjector();

        await judgeContract(rootState.app.web3)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.tx.addRole({
            value,
            gasLimit
        }, name).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result)
        });
        data = formatResult(data);
        return data
    },

    async addRoute({rootState}, {name, routeValue}) {
        const injector = await Accounts.accountInjector();
        await judgeContract(rootState.app.web3)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.tx.addRoute({
            value,
            gasLimit
        }, name, routeValue).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result)
        });
        data = formatResult(data);
        return data
    },
    async changeRoute({rootState}, {name, value}) {
        const injector = await Accounts.accountInjector();
        await judgeContract(rootState.app.web3)
        if (rootState.app.balance < 1.01) {
            eventBus.$emit('message', {
                type: "error",
                message: "Not enough gas"
            })
            return
        }
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.tx.changeRoute({
            value,
            gasLimit
        }, name, value).signAndSend(AccountId, {signer: injector.signer}, (result) => {
            dealResult(result)
        });
        data = formatResult(data);
        return data
    },
    async getAuthAddr({rootState}, addr) {
        const AccountId = await Accounts.accountAddress();
        await judgeContract(rootState.app.web3)
        let data = await state.contract.query.getAuthAddr(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async getRoleAddr({rootState}, addr) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getRoleAddr(AccountId, {value, gasLimit})
        data = formatResult(data);
        return data
    },
    async getRouteAddr({rootState}) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getRouteAddr(AccountId, {value, gasLimit})
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
