// const { get } = require("http");
const regeneratorRuntime = require('./utils/runtime');
// app.js
App({
  globalData:{
    // musicBs:[]
  },
  onLaunch() {   // 获取推荐歌曲
    let that = this;
    let musicBs = []
    const requestTask1 = wx.request({
      url: 'http://192.168.0.101:3000/personalized/newsong',
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
      url:"http://192.168.0.101:3000/top/playlist",
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
      url:"http://192.168.0.101:3000/top/playlist/highquality",
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
    const requestTask4 = wx.request({
      url:"http://192.168.0.100:3000/toplist",
      success(res){
        // 获取榜单ID
      // console.log(res.data.list);
      for (let i = 0; i < 2; i++) {
        // console.log(res.data.list[i].id);
        if (i == 0) {
          // 飙升榜
          wx.request({
            url: 'http://192.168.0.100:3000/playlist/detail',
            data:{
              id:res.data.list[i].id
            },
          async  success(res){
              // console.log(res.data.privileges)
              for (let i = 0; i < res.data.privileges.length; i++) {
                // console.log(res.data.privileges[i].id);
                // 飙升榜歌曲信息
                let music  =await  wx.request({
                      url: 'http://192.168.0.100:3000/song/detail',
                      data:{
                        ids:res.data.privileges[i].id
                      },
                    })
                    console.log(music);
              }
              try {
                  wx.setStorageSync('soaringList', musicBs)
              } catch (error) {
                
              }
            }
          })
        }else{
          // 新歌榜
          wx.request({
            url: 'http://192.168.0.101:3000/playlist/detail',
            data:{
              id:res.data.list[i].id
            },
            success(res){
              console.log(res.data.privileges);
            }
          })
        }
      }
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
    // console.log(this.globalData.username);
  }
})
