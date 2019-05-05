// pages/login/login.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.needauth = false;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  getPhone(e) {
    console.log(e)
    this.Base.setMyData({
      mobile: e.detail.value
    });
  }
  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({
      mobile: phoneno
    });
  }
  confirm(e) {
    var that = this;
    var data = e.detail.value;
    if (data.name == "") {
      this.Base.info("请输入您的姓名");
      return;
    }
    if (data.mobile == "") {
      this.Base.info("请点击绑定手机号");
      return;
    }

    if (data.mobile == "") {
      this.Base.info("请点击绑定手机号");
      return;
    }

    var mobile = data.mobile;
    var name = data.name;
    AppBase.UserInfo.mobile = mobile;
    AppBase.UserInfo.name = name;
    var openid = AppBase.UserInfo.openid;
    var session_key = AppBase.UserInfo.session_key;
    var api = new MemberApi();
    api.update(AppBase.UserInfo, () => {

      console.log("牛逼");
      console.log(AppBase.UserInfo);
      api.register({
        mobile: mobile,
        name: name,
        openid: openid,
        session_key: session_key
      }, (ret) => {
        console.log(ret);
        console.log(122222222);

        api.info({
          mobile: mobile,
          name: name
        }, (info) => {
          console.log(info);
          console.log(1231321321321);
          if (ret.code == 0) {

            // if (info.userrole_id==2){
            wx.reLaunch({
              url: '/pages/home/home',
            })
          } else {
            this.Base.info("用户信息不正确");
          }
        })
      })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm; 
body.getPhone = content.getPhone;
Page(body)