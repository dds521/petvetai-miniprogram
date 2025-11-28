// app.js
App({
  onLaunch() {
    // 检查是否已看过引导页
    const hasSeenOnboarding = wx.getStorageSync('hasSeenOnboarding');
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    
    // 如果已看过引导页且已登录，直接进入首页
    if (hasSeenOnboarding && isLoggedIn) {
      // 已登录，无需处理，让页面正常加载
      return;
    }
    
    // 如果已看过引导页但未登录，跳转到登录页
    if (hasSeenOnboarding && !isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login'
      });
      return;
    }
    
    // 未看过引导页，显示引导页（引导页是首页，会自动显示）
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})


