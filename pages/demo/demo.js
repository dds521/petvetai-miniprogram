/**
 * Demo 页面
 * 展示小程序与后端服务的通信示例
 */

const { healthApi, diagnosisApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 健康检查相关
    healthStatus: null,
    isCheckingHealth: false,
    
    // 诊断相关
    petId: 1,
    symptomDesc: '',
    diagnosisResult: null,
    isDiagnosing: false,
    diagnosisError: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时自动检查服务健康状态
    this.checkHealthStatus()
  },

  /**
   * 检查后端服务健康状态
   */
  async checkHealthStatus() {
    this.setData({
      isCheckingHealth: true,
      healthStatus: null
    })

    try {
      const result = await healthApi.checkHealth()
      this.setData({
        healthStatus: {
          success: true,
          message: '服务正常',
          data: result
        },
        isCheckingHealth: false
      })
      
      wx.showToast({
        title: '服务正常',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('健康检查失败:', error)
      this.setData({
        healthStatus: {
          success: false,
          message: error.message || '服务不可用',
          data: null
        },
        isCheckingHealth: false
      })
      
      wx.showToast({
        title: '服务不可用',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 输入宠物ID
   */
  onPetIdInput(e) {
    this.setData({
      petId: parseInt(e.detail.value) || 1
    })
  },

  /**
   * 输入症状描述
   */
  onSymptomInput(e) {
    this.setData({
      symptomDesc: e.detail.value
    })
  },

  /**
   * 提交诊断请求
   */
  async submitDiagnosis() {
    // 验证输入
    if (!this.data.symptomDesc.trim()) {
      wx.showToast({
        title: '请输入症状描述',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.petId <= 0) {
      wx.showToast({
        title: '请输入有效的宠物ID',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 设置加载状态
    this.setData({
      isDiagnosing: true,
      diagnosisResult: null,
      diagnosisError: null
    })

    try {
      // 调用诊断 API
      const result = await diagnosisApi.submitDiagnosis(
        this.data.petId,
        this.data.symptomDesc
      )

      // 显示结果
      this.setData({
        diagnosisResult: result,
        isDiagnosing: false
      })

      wx.showToast({
        title: '诊断完成',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('诊断失败:', error)
      
      this.setData({
        diagnosisError: error.message || '诊断失败，请重试',
        isDiagnosing: false
      })

      wx.showToast({
        title: '诊断失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 清空诊断结果
   */
  clearDiagnosis() {
    this.setData({
      symptomDesc: '',
      diagnosisResult: null,
      diagnosisError: null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.checkHealthStatus()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'PetVetAI - 小程序与后端通信 Demo',
      path: '/pages/demo/demo'
    }
  }
})

