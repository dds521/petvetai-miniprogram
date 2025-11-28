// pages/onboarding/onboarding.js
Page({
  data: {
    currentIndex: 0,
    totalPages: 3
  },

  onLoad() {
    // 页面加载
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  nextStep() {
    const { currentIndex, totalPages } = this.data;
    
    if (currentIndex < totalPages - 1) {
      // 切换到下一页
      this.setData({
        currentIndex: currentIndex + 1
      });
    } else {
      // 最后一页，跳转到登录页
      this.goToLogin();
    }
  },

  skipOnboarding() {
    // 跳过引导，直接跳转到登录页
    this.goToLogin();
  },

  goToLogin() {
    // 标记已看过引导页
    wx.setStorageSync('hasSeenOnboarding', true);
    
    // 跳转到登录页
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
});

