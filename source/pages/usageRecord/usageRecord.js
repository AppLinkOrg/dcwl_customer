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

    var usagerecordApi = new UsagerecordApi();
    usagerecordApi.list({}, (list) => {
      console.log(list)
      that.Base.setMyData({list});
    });
  


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changePlayinback = content.changePlayinback;
Page(body)