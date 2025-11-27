/**
 * 统一 API 服务模块
 * 提供所有后端 API 调用的统一入口
 */

const { get, post } = require('./request')
const apiConfig = require('../config/api')

/**
 * 健康检查 API
 */
const healthApi = {
  /**
   * 检查后端服务健康状态
   * @returns {Promise} 健康检查结果
   */
  checkHealth() {
    return get(
      apiConfig.endpoints.HEALTH,
      {},
      {
        loading: false,
        timeout: 5000
      }
    )
  }
}

/**
 * 宠物诊断 API
 */
const diagnosisApi = {
  /**
   * 提交诊断请求
   * @param {Number} petId 宠物ID
   * @param {String} symptomDesc 症状描述
   * @returns {Promise} 诊断结果
   */
  submitDiagnosis(petId, symptomDesc) {
    return post(
      apiConfig.endpoints.DIAGNOSE,
      {
        petId: petId,
        symptomDesc: symptomDesc
      },
      {
        loading: true,
        loadingText: 'AI分析中...'
      }
    )
  }
}

module.exports = {
  healthApi,
  diagnosisApi
}

