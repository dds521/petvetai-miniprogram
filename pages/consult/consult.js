// pages/consult/consult.js
Page({
  data: {
    messages: [
      {
        id: '1',
        type: 'ai',
        content: '您好！我是专业的宠物医疗顾问。我可以帮您解答关于宠物健康的各种问题。请告诉我您想咨询什么？',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
    ],
    input: '',
    canSend: false, // 是否可以发送
    isTyping: false,
    inputFocused: false
  },

  onLoad() {
    // 页面加载
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 获取AI回复
  getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('呕吐') || lowerMessage.includes('吐')) {
      return '宠物呕吐可能有多种原因：\n\n1. **饮食问题**：吃得太快、食物不新鲜或突然更换食物\n2. **肠胃炎**：可能伴有腹泻\n3. **寄生虫感染**\n4. **异物堵塞**：误食玩具或其他物品\n\n建议：\n- 禁食4-6小时，少量多次给水\n- 如果持续呕吐或出现血液，请立即就医\n- 观察是否有其他症状如精神不振、发热等'
    }
    
    if (lowerMessage.includes('拉肚子') || lowerMessage.includes('腹泻')) {
      return '腹泻的常见原因：\n\n1. **饮食不当**：吃了不该吃的东西\n2. **肠胃敏感**：对某些食物过敏\n3. **寄生虫**：需要定期驱虫\n4. **病毒感染**\n\n处理建议：\n- 提供充足的水分，防止脱水\n- 可以喂食易消化的食物\n- 如果腹泻超过24小时或有血便，请就医\n- 注意观察体温和精神状态'
    }
    
    if (lowerMessage.includes('疫苗') || lowerMessage.includes('打针')) {
      return '宠物疫苗接种指南：\n\n**幼年疫苗计划**：\n- 6-8周：第一针多联疫苗\n- 10-12周：第二针多联疫苗\n- 14-16周：第三针多联疫苗 + 狂犬疫苗\n\n**成年后**：\n- 每年加强一次多联疫苗\n- 每1-3年加强狂犬疫苗\n\n**注意事项**：\n- 疫苗前确保宠物健康\n- 接种后观察15-30分钟\n- 一周内避免洗澡和剧烈运动'
    }
    
    if (lowerMessage.includes('驱虫')) {
      return '驱虫指南：\n\n**体内驱虫**：\n- 幼年期：每月一次（6个月内）\n- 成年期：每3个月一次\n\n**体外驱虫**：\n- 每月一次（特别是春夏季）\n- 预防跳蚤、蜱虫、螨虫\n\n**注意事项**：\n- 根据体重选择合适的驱虫药\n- 体内外驱虫可以间隔3-5天\n- 定期检查粪便'
    }
    
    if (lowerMessage.includes('你好') || lowerMessage.includes('在吗')) {
      return '您好！我在的。很高兴为您和您的爱宠服务。您有什么问题想咨询吗？'
    }
    
    return '感谢您的咨询。关于您提到的问题，我建议：\n\n1. 仔细观察宠物的症状和行为变化\n2. 记录症状出现的时间和频率\n3. 注意是否有食欲、精神状态的变化\n4. 如果症状持续或加重，请及时就医\n\n您能详细描述一下具体症状吗？'
  },

  // 输入内容
  onInput(e) {
    const value = e.detail.value
    this.setData({
      input: value,
      canSend: value.trim().length > 0
    })
  },

  handleInputFocus() {
    this.setData({
      inputFocused: true
    })
  },

  handleInputBlur() {
    this.setData({
      inputFocused: false
    })
  },

  // 发送消息
  sendMessage() {
    const input = this.data.input.trim()
    if (!input || !this.data.canSend) return

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    this.setData({
      messages: [...this.data.messages, userMessage],
      input: '',
      canSend: false,
      isTyping: true
    })

    // 滚动到底部
    this.scrollToBottom()

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: this.getAIResponse(input),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      this.setData({
        messages: [...this.data.messages, aiResponse],
        isTyping: false
      })
      this.scrollToBottom()
    }, 1000 + Math.random() * 1000)
  },

  // 滚动到底部
  scrollToBottom() {
    setTimeout(() => {
      wx.createSelectorQuery().select('.messages-container').boundingClientRect((rect) => {
        if (rect) {
          wx.pageScrollTo({
            scrollTop: rect.height,
            duration: 300
          })
        }
      }).exec()
    }, 100)
  }
})

