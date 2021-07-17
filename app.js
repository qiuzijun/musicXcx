// const { get } = require("http");
const regeneratorRuntime = require('./utils/runtime');
// app.js
App({
  onLaunch() {   // 获取推荐歌曲
    

    let that = this;
    let musicBs = []
    const requestTask1 = wx.request({
      url: 'http://192.168.0.102:3000/personalized/newsong',
      data:{
        // 前100条
        limit:100
      },
      success(res){
        // console.log(res.data.result);
        // 本地缓存歌曲
        try {
          wx.setStorageSync('tjGequ', res.data.result)
        } catch (error) {
          console.log(error);
        }
      },
      fail(error){
        console.log(error);
      }
    })
    // 获取热门歌单
    const requestTask2 = wx.request({
      url:"http://192.168.0.102:3000/top/playlist",
      data:{
        // 前6条热单
        limit:6,
        order:'hot'
      },
      success(res){
      // console.log(res.data.playlists);
      // 缓存本地
            try {
              wx.setStorageSync('remGedan', res.data.playlists)
            } catch (error) {
              console.log(error);
            }
      }
    })
    // 官方歌单
    const requestTask3 = wx.request({
      url:"http://192.168.0.102:3000/top/playlist/highquality",
      data:{
        // 前6条热单
        limit:6,
        before:1503639064232
      },
      success(res){
      console.log(res);
      // 缓存本地
            try {
              wx.setStorageSync('guanFang', res.data.playlists)
            } catch (error) {
              console.log(error);
            }
      }
    })
    // 歌曲排行
    // 获取榜单ID
    const requestTask4 = wx.request({
      url:"http://192.168.0.102:3000/toplist",
      success(res){
        // 缓存本地
        try {
          wx.setStorageSync('topListId', res.data.list)
        } catch (error) {
          console.log(error);
        }
      }
    })
    // 获取 飙升榜
    const requestTask5 = wx.request({
      url:"http://192.168.0.102:3000/playlist/detail",
      data:{
              id:19723756
          },
      success(res){
        // 缓存本地
        // console.log(res.data.privileges);
        try {
          wx.setStorageSync('soaringList', res.data.privileges)
        } catch (error) {
          console.log(error);
        }
      }
    })
    // 获取飙升歌曲信息
    var soaringList = wx.getStorageSync('soaringList')
    // console.log(soaringList);
    let musci = []
    for (let i = 0; i < soaringList.length; i++) {
      // console.log(soaringList[i]);
      const requestTask6 = wx.request({
        url:"http://192.168.0.102:3000/song/detail",
        data:{
                ids:soaringList[i].id
            },
        success(res){
          // 缓存本地
          // console.log(res.data.songs[0]);
          musci.push(res.data.songs[0])
          try {
            wx.setStorageSync('soaringListxi', musci)
          } catch (error) {
            console.log(error);
          }
        }
      })
    }
    
    // 获取 新歌榜
    const requestTask7 = wx.request({
      url:"http://192.168.0.102:3000/playlist/detail",
      data:{
              id:3779629
          },
      success(res){
        // 缓存本地
        // console.log(res.data.privileges);
        try {
          wx.setStorageSync('newSongs', res.data.privileges)
        } catch (error) {
          console.log(error);
        }
      }
    })
    // 获取新歌曲信息
    var newSongs = wx.getStorageSync('newSongs')
    // console.log(newSongs);
    let musci1 = []
    for (let i = 0; i < newSongs.length; i++) {
      // console.log(newSongs[i].id);
      const requestTask8 = wx.request({
        url:"http://192.168.0.102:3000/song/detail",
        data:{
                ids:newSongs[i].id
            },
        success(res){
          // 缓存本地
          // console.log(res);
          musci1.push(res.data.songs[0])
          try {
            wx.setStorageSync('newSongsxi', musci1)
          } catch (error) {
            console.log(error);
          }
        }
      })
    }
      
   
  },
  globalData: {
    username:'',
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
