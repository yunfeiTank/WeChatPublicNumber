import { Indicator } from "mint-ui";
import ModelType from '@/plugins/modelType'

export default (wx, axios) => {
    // 遮罩
    Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
    });
    // url当前地址
    let url = "";
    ModelType == 0 ? url = location.href : url = location.href.split("#")[0]
    // 获取jssdk
    axios
        .get("/OAutho/JsSdkConfig", {
            params: { page: url }
        })
        .then(res => {
            /* ---关闭遮罩--- */
            Indicator.close();
            /* ---生成签名--- */
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: "wx7a6ff0f36feddc5a", // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: ["chooseImage"] // 必填，需要使用的JS接口列表
            });
        }).catch(() => {
            /* ---关闭遮罩--- */
            Indicator.close();
        })
}