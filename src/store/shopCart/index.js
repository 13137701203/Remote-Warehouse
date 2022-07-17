import { reqShopList, reqaddToCart, deleteCart, checkCart } from '@/api'

const state = {
  shopList: [],
}
const mutations = {
  REQSHOPLIST(state, shopList) {
    if (shopList.length == 0) {
      state.shopList = shopList
    } else {
      state.shopList = shopList[0].cartInfoList
    }
  },
}

const getters = {
  isAllchecked(state) {
    return (
      // state.shopList.length > 0 &&
      state.shopList.every((item) => {
        return item.isChecked === 1
      })
    )
  },
}
const actions = {
  async reqGetShopList({ commit }) {
    let result = await reqShopList()
    if (result.code === 200) {
      commit('REQSHOPLIST', result.data)
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async reqGetaddToCart({ commit }, { skuId, skuNum }) {
    let result = await reqaddToCart(skuId, skuNum)

    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async reqGetdeleteCart({ commit }, { skuId }) {
    let result = await deleteCart(skuId)
    if (result.code === 200) {
      console.log('ok')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  async reqGetCheckCart({ commit }, { skuId, isChecked }) {
    let result = await checkCart(skuId, isChecked)

    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  deleteAllSlected({ state, dispatch }) {
    let promiseAll = []
    state.shopList.forEach((item) => {
      let promise =
        item.isChecked == 0
          ? dispatch('reqGetdeleteCart', {
              skuId: item.skuId,
            })
          : ''
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },

  allSlected({ state, dispatch }, isChecked) {
    let promiseAll = []
    state.shopList.forEach((item) => {
      let promise = dispatch('reqGetCheckCart', {
        skuId: item.skuId,
        isChecked: isChecked,
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
