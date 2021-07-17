// pages/hotSong/hotSong.js
Page({
  data: {
    request:[],
    index:0,
    ismusicImg:'',
    ismusicName:'',
    ismusicBf:'',
    ismusicId:'',
    ismusicUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      request:wx.getStorageSync('tjGequ')
    })
  },
  musicP(e){
    let that = this
    // console.log(e.currentTarget.dataset.name.id);
    // console.log(that.data.ismusicId);
    this.setData({
      ismusicImg:e.currentTarget.dataset.name.picUrl,
      ismusicName:e.currentTarget.dataset.name.name,
      ismusicId:e.currentTarget.dataset.name.id,
      index:1
    })
    
    wx.request({
      url: 'http://192.168.0.102:3000/song/url',
      data:{
        id:that.data.ismusicId
      },
      success(res){
        console.log(res);
        that.setData({
          ismusicUrl:res.data.data[0].url
        })
      }
    })
  },
  audioPlay(){
    let a = 0
    const bgMusic = wx.getBackgroundAudioManager()
    bgMusic.src=this.data.ismusicUrl,
    bgMusic.title = this.data.ismusicName
    if (a = 0) {
      bgMusic.play()
      a = 1
    }else{
      bgMusic.pause()
      a = 0
    }
    
   
  }
})