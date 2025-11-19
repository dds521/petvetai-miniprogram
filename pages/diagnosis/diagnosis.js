// pages/diagnosis/diagnosis.js
const diagnosisService = require('../../utils/diagnosis')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    petId: 1,
    symptomDesc: '',
    isLoading: false,
    diagnosisResult: null,
    error: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
   * 提交诊断
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
      isLoading: true,
      diagnosisResult: null,
      error: null
    })

    try {
      // 调用诊断服务
      const result = await diagnosisService.submitDiagnosis(
        this.data.petId,
        this.data.symptomDesc
      )

      // 显示结果
      this.setData({
        diagnosisResult: result,
        isLoading: false
      })

      wx.showToast({
        title: '诊断完成',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('诊断失败:', error)
      
      this.setData({
        error: error.message || '诊断失败，请重试',
        isLoading: false
      })

      wx.showToast({
        title: '诊断失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 清空输入
   */
  clearInput() {
    this.setData({
      symptomDesc: '',
      diagnosisResult: null,
      error: null
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
    this.clearInput()
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
      title: 'PetVetAI - AI 宠物医疗助手',
      path: '/pages/diagnosis/diagnosis'
    }
  }
})

