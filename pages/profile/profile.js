// pages/profile/profile.js
Page({
  data: {
    stats: [
      { label: '咨询次数', value: '12', icon: '💬' },
      { label: '预约记录', value: '8', icon: '📅' },
      { label: '积分', value: '560', icon: '⭐' },
    ],
    menuItems: [
      {
        icon: '❤️',
        label: '我的宠物',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
      },
      {
        icon: '📅',
        label: '预约记录',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      },
      {
        icon: '📄',
        label: '健康档案',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
      },
      {
        icon: '💳',
        label: '我的订单',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
      },
      {
        icon: '🔔',
        label: '消息通知',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
      },
      {
        icon: '⚙️',
        label: '设置',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50',
      },
      {
        icon: '❓',
        label: '帮助中心',
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50',
      },
    ]
  },

  onLoad: function (options) {

  },
  
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          wx.removeStorageSync('isLoggedIn')
          wx.removeStorageSync('userInfo')
          
          // 跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login',
            success: () => {
              wx.showToast({
                title: '已退出登录',
                icon: 'success',
                duration: 1500
              })
            }
          })
        }
      }
    })
  }
});

