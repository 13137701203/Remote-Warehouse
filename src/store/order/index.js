import { reqOrderInfo, reqUserLoca } from '@/api'

const state = {
  orderInfo: {},
  location: [],
}
const mutations = {
  REQUSERLOCA(state, location) {
    console.log()
    state.location = location
  },
  REQORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  },
}

const getters = {
  detailArrayList(state) {
    return state.orderInfo.detailArrayList
  },
}
const actions = {
  async reqGetOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    if (result.code === 200) {
      commit('REQORDERINFO', result.data)
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async reqGetUserLoca({ commit }) {
    let result = await reqUserLoca()
    if (result.code === 200) {
      console.log('ok')
      commit('REQUSERLOCA', result.data)
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
