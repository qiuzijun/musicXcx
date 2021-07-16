
Page({
  data: {
    musicList:[]
  },
  onLoad(){
    let that = this;
    try {
     var value =  wx.getStorageSync('gedan')
     if(value){
      that.setData({
        musicList:value  
                                             
      })
     }
    } catch (error) {
      console.log(error);
    }
    console.log(that.data.musicList);
  },
  play(){
    wx.navigateTo({
      url: '../play/play',
    })
  }
})
