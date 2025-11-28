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

  /**
   * 微信一键登录
   * 
   * 1. 调用wx.login()获取code
   * 2. 将code发送到后端服务器
   * 3. 后端通过code获取openId和sessionKey
   * 4. 后端创建或更新用户，生成JWT Token
   * 5. 前端保存token和用户信息
   * 6. 跳转到首页
   */
  handleWeChatLogin() {
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    // 1. 获取微信登录code
    wx.login({
      success: (loginRes) => {
        if (loginRes.code) {
          console.log('获取到微信登录code:', loginRes.code);
          
          // 2. 调用后端登录接口
          const request = require('../../utils/request');
          const apiConfig = require('../../config/api');
          
          request.post(apiConfig.endpoints.WECHAT_LOGIN, {
            code: loginRes.code
          }, {
            loading: false // 已经显示了loading，这里不再显示
          }).then((res) => {
            wx.hideLoading();
            
            if (res.success) {
              console.log('登录成功，用户信息:', res.user);
              
              // 3. 保存token和用户信息到本地存储
              wx.setStorageSync('token', res.token);
              wx.setStorageSync('userInfo', res.user);
              wx.setStorageSync('isLoggedIn', true);
              
              // 4. 登录成功后跳转到首页
              wx.switchTab({
                url: '/pages/index/index'
              });
            } else {
              wx.showToast({
                title: res.message || '登录失败',
                icon: 'none',
                duration: 2000
              });
            }
          }).catch((err) => {
            wx.hideLoading();
            console.error('登录请求失败:', err);
            wx.showToast({
              title: '网络请求失败，请检查网络连接',
              icon: 'none',
              duration: 2000
            });
          });
        } else {
          wx.hideLoading();
          console.error('获取微信登录code失败:', loginRes.errMsg);
          wx.showToast({
            title: '获取登录凭证失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('调用wx.login失败:', err);
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
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

