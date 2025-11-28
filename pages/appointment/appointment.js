// pages/appointment/appointment.js
Page({
  data: {
    selectedDate: '2024-01-15',
    selectedTime: null,
    hospitals: [
      {
        id: 1,
        name: '爱宠动物医院',
        address: '北京市朝阳区建国路88号',
        distance: '1.2km',
        rating: 4.8,
        reviews: 256,
      },
      {
        id: 2,
        name: '宠颐生宠物医院',
        address: '北京市海淀区中关村大街100号',
        distance: '2.5km',
        rating: 4.9,
        reviews: 412,
      },
    ],
    timeSlots: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    ],
    dates: [
      { date: '2024-01-15', day: '周一', label: '今天' },
      { date: '2024-01-16', day: '周二', label: '明天' },
      { date: '2024-01-17', day: '周三', label: '17日' },
      { date: '2024-01-18', day: '周四', label: '18日' },
      { date: '2024-01-19', day: '周五', label: '19日' },
    ],
    canSubmit: false
  },

  onLoad: function (options) {

  },

  selectDate: function(e) {
    const selectedDate = e.currentTarget.dataset.date;
    this.setData({
      selectedDate: selectedDate
    });
  },

  selectTime: function(e) {
    const selectedTime = e.currentTarget.dataset.time;
    this.setData({
      selectedTime: selectedTime,
      canSubmit: !!selectedTime
    });
  },
  
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  confirmAppointment: function() {
    if (this.data.canSubmit) {
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      });
    }
  }
})

