// pages/login/login.js
Page({
  data: {
    loginType: 'wechat', // 'wechat' | 'phone'
    phoneNumber: '',
    verifyCode: '',
    canGetCode: true,
    codeButtonText: '获取验证码',
    countdown: 0,
    canLogin: false
  },

  onLoad() {
    // 页面加载
  },

  switchTab(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      loginType: type
    });
  },

  onPhoneInput(e) {
    const phoneNumber = e.detail.value;
    const canGetCode = /^1[3-9]\d{9}$/.test(phoneNumber);
    const canLogin = canGetCode && this.data.verifyCode.length === 6;
    
    this.setData({
      phoneNumber,
      canGetCode,
      canLogin
    });
  },

  onCodeInput(e) {
    const verifyCode = e.detail.value;
    const canLogin = /^1[3-9]\d{9}$/.test(this.data.phoneNumber) && verifyCode.length === 6;
    
    this.setData({
      verifyCode,
      canLogin
    });
  },

  getVerifyCode() {
    if (!this.data.canGetCode || this.data.countdown > 0) {
      return;
    }

    // 发送验证码逻辑
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });

    // 开始倒计时
    let countdown = 60;
    this.setData({
      countdown,
      canGetCode: false,
      codeButtonText: `${countdown}秒后重试`
    });

    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({
          countdown: 0,
          canGetCode: true,
          codeButtonText: '获取验证码'
        });
      } else {
        this.setData({
          countdown,
          codeButtonText: `${countdown}秒后重试`
        });
      }
    }, 1000);
  },

  handlePhoneLogin() {
    if (!this.data.canLogin) {
      return;
    }

    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.setStorageSync('isLoggedIn', true);
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1500);
  },

  handleWeChatLogin() {
    // 微信登录逻辑
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    // 模拟登录过程
    setTimeout(() => {
      wx.hideLoading();
      // 标记已登录
      wx.setStorageSync('isLoggedIn', true);
      // 登录成功后跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1500);
  },

  handleGuestLogin() {
    // 游客模式登录
    wx.showLoading({
      title: '进入中...',
      mask: true
    });

    setTimeout(() => {
      wx.hideLoading();
      // 标记已登录（游客模式）
      wx.setStorageSync('isLoggedIn', true);
      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1000);
  },

  showAgreement() {
    wx.showToast({
      title: '用户协议',
      icon: 'none'
    });
  },

  showPrivacy() {
    wx.showToast({
      title: '隐私政策',
      icon: 'none'
    });
  }
});

