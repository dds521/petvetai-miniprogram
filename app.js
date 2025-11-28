// app.js
App({
  /**
   * 小程序启动时的初始化逻辑
   * 
   * 1. 检查是否已看过引导页
   * 2. 检查是否已登录（通过token判断）
   * 3. 如果未登录，跳转到登录页
   */
  onLaunch() {
    // 检查是否已看过引导页
    const hasSeenOnboarding = wx.getStorageSync('hasSeenOnboarding');
    const token = wx.getStorageSync('token');
    const isLoggedIn = !!token; // 通过token判断是否登录
    
    // 如果已看过引导页且已登录，直接进入首页
    if (hasSeenOnboarding && isLoggedIn) {
      // 已登录，无需处理，让页面正常加载
      console.log('用户已登录，直接进入首页');
      return;
    }
    
    // 如果已看过引导页但未登录，跳转到登录页
    if (hasSeenOnboarding && !isLoggedIn) {
      console.log('用户未登录，跳转到登录页');
      wx.redirectTo({
        url: '/pages/login/login'
      });
      return;
    }
    
    // 未看过引导页，显示引导页（引导页是首页，会自动显示）
    console.log('首次启动，显示引导页');
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  }
})


