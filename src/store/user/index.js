import {
  reqGetCode,
  reqRegisterCom,
  reqUserLogin,
  reqUserInfo,
  reqLoginOut,
} from '@/api'

const state = {
  code: [],
  token: localStorage.getItem('TOKEN'),
  userInfo: {},
}
const mutations = {
  REQGETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLERAINFO(state) {
    state.token = ''
    state.userInfo = {}
  },
}

const getters = {}
const actions = {
  async reqCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('REQGETCODE', result.data)
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async reqGetRegisterCom({ commit }, data) {
    let result = await reqRegisterCom(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  async reqGetUserLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  async reqGetLoginOut({ commit }) {
    let result = await reqLoginOut()
    console.log(result)
    if (result.code === 200) {
      localStorage.removeItem('TOKEN')
      commit('CLERAINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  async reqGetUserInfo({ commit }) {
    let result = await reqUserInfo()

    if (result.code === 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
    }
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
