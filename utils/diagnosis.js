/**
 * 诊断服务
 * 处理宠物症状诊断相关的 API 调用
 */

const { diagnosisApi } = require('./api')

/**
 * 提交诊断请求
 * @param {Number} petId 宠物ID
 * @param {String} symptomDesc 症状描述
 * @returns {Promise} 诊断结果
 */
function submitDiagnosis(petId, symptomDesc) {
  return diagnosisApi.submitDiagnosis(petId, symptomDesc)
}

module.exports = {
  submitDiagnosis
}


