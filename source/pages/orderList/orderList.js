// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { QuoteferryApi } from "../../apis/quoteferry.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      month: options.month
    })

  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    var memberApi = new MemberApi();
    var memberinfo = this.Base.getMyData().memberinfo;
  //  memberApi.info({}, (ret) => {
    that.Base.setMyData({ mobile: memberinfo.mobile });
      if (that.Base.getMyData().month){
        var data={
          mobile: memberinfo.mobile, 
          submit_time: that.Base.getMyData().month
        }
      }else{
        data={
          mobile: memberinfo.mobile
        }
      }

      var quoteferryapi = new QuoteferryApi();
      quoteferryapi.list(data, (ret) => {
        console.log(ret)
        this.Base.setMyData({ list: ret });
      });
    //})

    

  }



}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)