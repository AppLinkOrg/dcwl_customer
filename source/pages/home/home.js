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
    this.Base.setMyData({ currenttab: 0 });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (indexbanner) => {
      that.Base.setMyData({ indexbanner: indexbanner });
    });
    instapi.info({}, (info) => {
      that.Base.setMyData(info);
    });
    instapi.servicelist({}, (servicelist) => {
      that.Base.setMyData({ servicelist: servicelist });
    });

    var memberApi = new MemberApi();
    // memberApi.info({},(ret)=>{
    //   that.Base.setMyData({ mobile: ret.mobile });
    // })
    var memberinfo = this.Base.getMyData().memberinfo;
    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.list({ status: 2, mobile: memberinfo.mobile }, (ret) => {
      this.Base.setMyData({ list_2: ret });
    });
    quoteferryapi.list({ status: 1, mobile: memberinfo.mobile }, (ret) => {
      this.Base.setMyData({ list_1: ret });
    });
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }
  changeTab(e) {
    console.log(e);
   
    this.Base.setMyData({ currenttab: e.currentTarget.id });
  }
  gotoFerryQuote() {
    wx.navigateTo({
      url: '/pages/quoteferry/quoteferry',
    })
  }

  confirmOrder(e) {
    // console.log(e)
    var that = this;
    wx.showModal({
      content: '请确认订单信息',
      success(res) {
        if (res.confirm) {
          var quoteferryapi = new QuoteferryApi();
          quoteferryapi.confirm({
            id: e.target.id
          }, (ret) => {
            console.log(ret)
            that.onMyShow();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  cancelOrder(e) {
    //console.log(e)
    wx.showModal({
      content: '是否取消订单',
      success(res) {
        if (res.confirm) {
          var quoteferryapi = new QuoteferryApi();
          quoteferryapi.abandon({
            id: e.target.id
          }, (ret) => {
            //console.log(ret)
            this.onMyShow();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

  cancelOrder1(e) {
    //console.log(e)
    wx.showModal({
      content: '是否取消询价',
      success(res) {
        if (res.confirm) {
          var quoteferryapi = new QuoteferryApi();
          quoteferryapi.abandon({ id: e.target.id }, (ret) => {
            //console.log(ret)
            this.onMyShow();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoSearch = content.gotoSearch;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
body.switchBrand = content.switchBrand;
body.switchPrice = content.switchPrice;
body.switchSize = content.switchSize;
body.gotoFerryQuote = content.gotoFerryQuote;
body.cancelOrder = content.cancelOrder;
body.cancelOrder1 = content.cancelOrder1;
body.confirmOrder = content.confirmOrder;

Page(body)