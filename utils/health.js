/**
 * 健康检查服务
 * 用于检查后端服务的可用性
 */

const { healthApi } = require('./api')

/**
 * 检查后端服务健康状态
 * @returns {Promise<Object>} 健康检查结果
 */
async function checkHealth() {
  try {
    const result = await healthApi.checkHealth()
    return {
      success: true,
      data: result,
      message: '服务正常'
    }
  } catch (error) {
    console.error('健康检查失败:', error)
    return {
      success: false,
      data: null,
      message: error.message || '服务不可用'
    }
  }
}

module.exports = {
  checkHealth
}

