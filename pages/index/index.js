
Page({
  data: {
    // 歌曲推荐
    musicList:[],
    // 歌单
    musicHot:[],
    // 官方
    musicGf:[]
  },
  onLoad(){
    let that = this;
    try {
      // 获取本地缓存歌曲
     var value =  wx.getStorageSync('tjGequ')
     if(value){
      that.setData({
        musicList:value                                   
      })
     }
    } catch (error) {
      console.log(error);
    }
    try {
      // 获取本地缓存歌单
     var hot =  wx.getStorageSync('remGedan')
     if(hot){
       
      that.setData({
        musicHot:hot                                   
      })
     }
    } catch (error) {
      console.log(error);
    }
    // console.log(that.data.musicHot);
    try {
      // 获取本地缓存歌单
     var gf =  wx.getStorageSync('guanFang')
     if(gf){
      that.setData({
        musicGf:gf                                   
      })
     }
    } catch (error) {
      console.log(error);
    }
  },
  
  // 跳转播放页面
  play(){
    wx.navigateTo({
      url: '../play/play',
    })
  },
  // 跳转歌单歌曲页面
  hotGe(){
    wx.navigateTo({
      url: '../hotGdGequ/hotGdGequ',
    })
  },
  // 跳转官方歌单
  gfGequ(){
    wx.navigateTo({
      url: '../gfGequ/gfGequ',
    })
  }

})
