// test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    flag:false,
    x:0,
    y:0,
    data:[{index:1},
      { index: 2 },
      { index: 3 },
      { index: 4 },
      { index: 5 },
      { index: 6 },
      { index: 7 }
    ],
    disabled: true,
    elements:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      var query = wx.createSelectorQuery();
      var nodesRef = query.selectAll(".item");
      nodesRef.fields({
      dataset: true,
      rect:true
      
    },(result)=>{
        this.setData({
            elements: result
          }, () => {
            console.log(this.data)
          })
        }).exec()
  },
  //长按
  _longtap:function(e){
    console.log(e)
    const detail = e.detail;
    this.setData({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
      // x: detail.x,
      // y: detail.y
    })
    this.setData({
      hidden: false,
      flag:true
    })

  },
  //触摸开始
  touchs:function(e){
    this.setData({
      beginIndex:e.currentTarget.dataset.index
    })
  },
  //触摸结束
  touchend:function(e){
    console.log('touchend:::', e)
    if (!this.data.flag) {
      return;
    }
    const x = e.changedTouches[0].pageX
    const y = e.changedTouches[0].pageY
    const list = this.data.elements;
    let data = this.data.data
    for(var j = 0; j<list.length; j++){
      const item = list[j];
      if(x>item.left && x<item.right && y>item.top && y<item.bottom){
        const endIndex = item.dataset.index;
        const beginIndex = this.data.beginIndex;
        //向后移动
        if (beginIndex < endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i < endIndex; i++) {
            data[i] = data[i + 1]
          }
          data[endIndex] = tem;
        }
        //向前移动
        if (beginIndex > endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i > endIndex; i--) {
            data[i] = data[i - 1]
          }
          data[endIndex] = tem;
        }

        this.setData({
          data: data
        })
      }
    }
    this.setData({
      hidden: true,
      flag: false,
      x: 0,
      y: 0
    })
  },
  //滑动
  touchm:function(e){
    if(this.data.flag){
      const x = e.touches[0].pageX
      const y = e.touches[0].pageY
      this.setData({
        x: x - 75,
        y: y - 45
      })
    }
  }
})
