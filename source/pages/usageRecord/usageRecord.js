// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { ContentApi } from "../../apis/content.api";
import { MemberApi } from "../../apis/member.api";
import { InstApi } from "../../apis/inst.api.js";
import { UsagerecordApi } from '../../apis/usagerecord.api';



class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.info({}, (info) => {
      that.Base.setMyData(info);
    });
    var mobile = AppBase.UserInfo.mobile;
    var name = AppBase.UserInfo.name;
    var memberApi = new MemberApi();
    var memberinfo = this.Base.getMyData().memberinfo;
   // memberApi.info({ mobile: mobile, name: name}, (ret) => {
      // that.Base.setMyData({ mobile: ret.mobile });
      var usagerecordApi = new UsagerecordApi();
    usagerecordApi.list({ mobile: memberinfo.mobile }, (list) => {
        console.log(list)
        that.Base.setMyData({ list });
      });
    //})

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changePlayinback = content.changePlayinback;
Page(body)