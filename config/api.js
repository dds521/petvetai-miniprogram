/**
 * API 配置
 * 统一管理 API 基础配置
 * 支持多环境配置切换
 */

// 环境配置
const env = {
  // 开发环境
  // 注意：小程序中不能直接使用 localhost
  // 1. 使用本机局域网 IP（如：http://192.168.1.100:48080）
  // 2. 或在微信开发者工具中设置代理
  // 3. 或使用真机调试，确保手机和电脑在同一网络
  development: {
    baseURL: 'http://localhost:48080', // 请根据实际情况修改为局域网 IP
    timeout: 30000
  },
  // 测试环境
  test: {
    baseURL: 'http://test.example.com:48080',
    timeout: 30000
  },
  // 生产环境
  production: {
    baseURL: 'https://api.petvetai.com',
    timeout: 30000
  }
}

// 获取当前环境（可以通过编译时设置或运行时判断）
// 小程序中可以通过 __wxConfig.envVersion 判断环境
// 或者通过 project.config.json 中的 setting.envVersion 设置
function getCurrentEnv() {
  // 优先使用编译时环境变量
  if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    return process.env.NODE_ENV
  }
  
  // 小程序运行时判断（需要在小程序基础库 2.10.2+）
  try {
    const accountInfo = wx.getAccountInfoSync()
    const envVersion = accountInfo.miniProgram.envVersion
    if (envVersion === 'release') return 'production'
    if (envVersion === 'trial') return 'test'
    if (envVersion === 'develop') return 'development'
  } catch (e) {
    console.warn('无法获取小程序环境信息，使用默认开发环境')
  }
  
  // 默认使用开发环境
  return 'development'
}

// 当前环境配置
const currentEnv = getCurrentEnv()
const envConfig = env[currentEnv] || env.development

// 导出配置
const config = {
  // 当前环境
  env: currentEnv,
  
  // API 基础地址
  baseURL: envConfig.baseURL,
  
  // 请求超时时间（毫秒）
  timeout: envConfig.timeout,
  
  // API 端点
  endpoints: {
    // 宠物诊断
    DIAGNOSE: '/api/pet/diagnose',
    // 健康检查
    HEALTH: '/actuator/health',
    // 微信登录
    WECHAT_LOGIN: '/api/auth/wechat/login',
    // 更新用户信息
    UPDATE_USER_INFO: '/api/auth/wechat/userinfo'
  }
}

module.exports = config


