/**
 * API 配置
 * 统一管理 API 基础配置
 */

// 开发环境配置
const config = {
  // API 基础地址
  // 开发环境：使用本地后端服务
  // 生产环境：需要配置为实际的后端服务地址
  baseURL: 'http://localhost:48080',
  
  // 请求超时时间（毫秒）
  timeout: 30000,
  
  // API 端点
  endpoints: {
    // 宠物诊断
    DIAGNOSE: '/api/pet/diagnose',
    // 健康检查
    HEALTH: '/actuator/health'
  }
}

module.exports = config

