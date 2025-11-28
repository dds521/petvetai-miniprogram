// pages/diagnosis/diagnosis.js
Page({
  data: {
    selectedImage: null,
    isAnalyzing: false,
    result: null
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad() {
    // 页面加载
  },

  // 选择图片 - 拍照
  takePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          selectedImage: tempFilePath,
          result: null
        })
      },
      fail: (err) => {
        console.error('拍照失败:', err)
        wx.showToast({
          title: '拍照失败',
          icon: 'none'
        })
      }
    })
  },

  // 选择图片 - 相册
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
    this.setData({
          selectedImage: tempFilePath,
          result: null
        })
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    })
  },

  // 重新选择图片
  reselectImage() {
    this.setData({
      selectedImage: null,
      result: null
    })
  },

  // 开始分析
  analyzeImage() {
    if (!this.data.selectedImage) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      })
      return
    }

    this.setData({
      isAnalyzing: true,
      result: null
    })

    // 模拟AI分析（实际应该调用后端API）
    setTimeout(() => {
      this.setData({
        result: {
          confidence: 85,
          condition: '健康状况良好',
          severity: 'low',
          description: '根据AI分析，您的宠物目前整体健康状况良好，毛发光泽，眼睛明亮，没有明显异常症状。',
          recommendations: [
            '继续保持良好的饮食习惯',
            '每天保证适量运动',
            '定期进行健康检查',
            '注意观察日常行为变化'
          ]
        },
        isAnalyzing: false
      })
    }, 2500)
  },

  // 获取严重程度颜色
  getSeverityColor(severity) {
    if (severity === 'high') return '#dc2626'
    if (severity === 'medium') return '#d97706'
    return '#059669'
  },

  // 获取严重程度背景
  getSeverityBg(severity) {
    if (severity === 'high') return '#fef2f2'
    if (severity === 'medium') return '#fffbeb'
    return '#f0fdf4'
  }
})
