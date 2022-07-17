import requests from './request'
import mockRequests from './mockAjax'

export const reqCategoryList = () => {
  return requests.get('/product/getBaseCategoryList')
}

export const reqGetBannerList = () => {
  return mockRequests.get('/banner')
}

export const reqFloorList = () => {
  return mockRequests.get('/floor')
}

export const reqSearchList = (params) => {
  return requests.post('/list', params)
}

export const reqDetail = (skuId) => {
  return requests.get(`/item/${skuId}`)
}

export const reqAddShop = (skuId, skuNum) => {
  return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

export const reqShopList = () => {
  return requests.get(`/cart/cartList`)
}

export const reqaddToCart = (skuId, skuNum) => {
  return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

export const deleteCart = (skuId) => {
  return requests.delete(`/cart/deleteCart/${skuId}`)
}

export const checkCart = (skuId, isChecked) => {
  return requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
}

export const reqGetCode = (phone) => {
  return requests.get(`/user/passport/sendCode/${phone}`)
}

export const reqRegisterCom = (data) => {
  return requests.post(`/user/passport/register`, data)
}

export const reqUserLogin = (data) => {
  return requests.post(`/user/passport/login`, data)
}

export const reqUserInfo = () => {
  return requests.get(`/user/passport/auth/getUserInfo`)
}

export const reqLoginOut = () => {
  return requests.get(`/user/passport/logout`)
}

export const reqOrderInfo = () => {
  return requests.get(`/order/auth/trade`)
}

export const reqUserLoca = () => {
  return requests.get(`/user/userAddress/auth/findUserAddressList`)
}

export const reqSubmitOrder = (tradeNo, data) => {
  return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}

export const reqOrderPay = (orderId) => {
  return requests.get(`/payment/weixin/createNative/${orderId}`)
}

export const reqPayState = (orderId) => {
  return requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

export const reqMyOrder = (page, limit) => {
  return requests.get(`/order/auth/${page}/${limit}`)
}
