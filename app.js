// app.js
App({
  globalData:{
    musicList:[]
  },
  onLaunch() {
    let that = this;
    const requestTask = wx.request({
      url: 'http://192.168.0.101:3000/personalized/newsong',
      data:{
        limit:100
      },
      success(res){
        console.log(res.data.result);
        try {
          wx.setStorageSync('gedan', res.data.result)
        } catch (error) {
          console.log(error);
        }
        
      },
      fail(error){
        console.log(error);
      }
    })
    
  },
  globalData: {
    username:null
  },
  onPageNotFound(){
    wx.switchTab({
      url: 'pages/logs/logs',
    })
  },
  onLoad(options){
    console.log(this.globalData.username);
  }
})
