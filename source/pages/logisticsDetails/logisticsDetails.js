// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { QuoteferryApi } from "../../apis/quoteferry.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ id: options.id});
   
  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.info({ id: this.Base.getMyData().id }, (ret) => {
      console.log(ret)
      that.Base.setMyData({ info: ret});
    });

  }

  copy(e){
    var that=this;
    var data = '';
    var dispatch = e.target.dataset.dispatch;
    for (var i = 0; i < dispatch.length; i++) {
      data = data + '司机:' + dispatch[i].name + '\n' + '联系方式:' + dispatch[i].mobile + '\n' + '身份证:' + dispatch[i].idcard + '\n' + '车辆:' + dispatch[i].plate_number + '\n \n'
    }
    wx.setClipboardData({
      data: data,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }

 

  
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.copy = content.copy;

Page(body)