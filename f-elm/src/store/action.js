import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

// 假设 getData() 和 getOtherData() 返回的是 Promise
// actions: {
//   async actionA ({ commit }) {
//     commit('gotData', await getData())
//   },
//   async actionB ({ dispatch, commit }) {
//     await dispatch('actionA') // 等待 actionA 完成
//     commit('gotOtherData', await getOtherData())
//   }
// }

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	async saveAddress({
		commit,
		state
	}) {

		if (state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);
	},
}