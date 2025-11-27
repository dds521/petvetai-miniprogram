/**
 * 网络请求工具
 * 封装微信小程序的 wx.request API
 */

const apiConfig = require('../config/api')

/**
 * 发起网络请求
 * @param {Object} options 请求配置
 * @returns {Promise} 请求结果
 */
function request(options) {
  return new Promise((resolve, reject) => {
    // 显示加载提示
    if (options.loading !== false) {
      wx.showLoading({
        title: options.loadingText || '加载中...',
        mask: true
      })
    }

    // 构建完整 URL
    const url = options.url.startsWith('http') 
      ? options.url 
      : `${apiConfig.baseURL}${options.url}`

    // 发起请求
    wx.request({
      url: url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      timeout: options.timeout || apiConfig.timeout,
      success: (res) => {
        // 隐藏加载提示
        if (options.loading !== false) {
          wx.hideLoading()
        }

        // 处理响应
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          const error = new Error(`请求失败: ${res.statusCode}`)
          error.statusCode = res.statusCode
          error.data = res.data
          reject(error)
        }
      },
      fail: (err) => {
        // 隐藏加载提示
        if (options.loading !== false) {
          wx.hideLoading()
        }

        // 网络错误处理
        console.error('请求失败:', err)
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      }
    })
  })
}

/**
 * GET 请求
 */
function get(url, data = {}, options = {}) {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  })
}

/**
 * POST 请求
 */
function post(url, data = {}, options = {}) {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT 请求
 */
function put(url, data = {}, options = {}) {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE 请求
 */
function del(url, data = {}, options = {}) {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

module.exports = {
  request,
  get,
  post,
  put,
  del
}


