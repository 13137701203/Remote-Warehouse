import { reqSearchList } from '@/api'

const state = {
  searchList: {},
}

const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}

const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}
const actions = {
  async searchList({ commit }, params = {}) {
    let result = await reqSearchList(params)
    if (result.code === 200) commit('SEARCHLIST', result.data)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
