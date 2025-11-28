// pages/index/index.js
Page({
  data: {
    pets: [
      {
        id: 1,
        name: '橘猫',
        age: '3岁',
        status: '健康',
        image: '🐱'
      },
      {
        id: 2,
        name: '金毛',
        age: '2岁',
        status: '健康',
        image: '🐕'
      }
    ],
    healthTips: [
      {
        id: 1,
        title: '猫咪夏季健康保障',
        description: '炎热的高温期是养宠人最烦恼的时期用语，了解猫咪如何保持健康度夏至关重要',
        readTime: '2分钟阅读',
        image: '🐱'
      },
      {
        id: 2,
        title: '狗狗夏季饮食指导',
        description: '炎热的季节需要调理狗狗的饮食结构，这些营养要求可以帮宠宠度过夏季的炎热',
        readTime: '5分钟阅读',
        image: '🐕'
      }
    ],
    doctors: [
      {
        id: 1,
        name: '张医生',
        status: '在线',
        specialty: '小动物科主任医师・10年经验',
        rating: 5.0,
        reviews: 328,
        avatar: '👨‍⚕️'
      },
      {
        id: 2,
        name: '王医生',
        status: '在线',
        specialty: '宠物内科专家・8年经验',
        rating: 4.8,
        reviews: 256,
        avatar: '👩‍⚕️'
      }
    ]
  },

  onLoad() {
    // 页面加载
  },

  // 跳转到咨询页面
  goToConsult() {
    wx.switchTab({
      url: '/pages/consult/consult'
    })
  },

  // 跳转到AI诊断页面
  goToDiagnosis() {
    wx.switchTab({
      url: '/pages/diagnosis/diagnosis'
    })
  },

  // 跳转到预约页面
  goToAppointment() {
    wx.switchTab({
      url: '/pages/appointment/appointment'
    })
  },

  // 跳转到健康小贴士详情
  goToHealthTips(e) {
    const id = e.currentTarget.dataset.id
    // 可以跳转到详情页
    console.log('查看健康小贴士', id)
  },

  // 咨询医生
  consultDoctor(e) {
    const doctorId = e.currentTarget.dataset.id
    wx.switchTab({
      url: '/pages/consult/consult'
    })
  },

  // 添加宠物
  addPet() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  // 搜索
  onSearchInput(e) {
    const value = e.detail.value
    // 处理搜索逻辑
    console.log('搜索:', value)
  }
})
