import { reqDetail, reqAddShop } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  detail: {},
  uuid_token: getUUID(),
}

const mutations = {
  REQDETAIL(state, detail) {
    state.detail = detail
  },
}

const getters = {
  categoryView() {
    return state.detail.categoryView || {}
  },
  skuInfo() {
    return state.detail.skuInfo || {}
  },
}
const actions = {
  async reqGetDetail({ commit }, skuid) {
    let result = await reqDetail(skuid)
    if (result.code === 200) commit('REQDETAIL', result.data)
  },
  async reqGetAddShop({ commit }, { skuId, skuNum }) {
    let result = await reqAddShop(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
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
