const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const xml2js = require('xml2js')
var sha1 = require('sha1');
const app = new Koa()
const url = require('url')
const conf = require('./conf')
const axios = require('axios')
const wechat = require('co-wechat')
//socket.io
const IO = require('koa-socket')
const io = new IO()
io.attach(app)
app._io.on('connection', scoket => {
    console.log('socket connection')
})

const crypto = require('crypto')
const xmlParser = require('koa-xml-body')
app.use(xmlParser())

const router = new Router()
app.use(static(__dirname + '/dist/'))
// app.use(static(__dirname + '/'))

/**
 * 此部分 用于配置 环境
 */
//验证
router.get('/wechat', ctx => {
    console.log('微信认证', ctx.url)
    const { query } = url.parse(ctx.url, true)
    const {
        signature,
        timestamp,
        nonce,
        echostr
    } = query
    console.log('wechat', query)
    // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
    let str = [conf.token, timestamp, nonce].sort().join('');
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');
    // 签名对比，相同则按照微信要求返回echostr参数值
    if (signature == strSha1) {
        ctx.body = echostr
    } else {
        ctx.body = "你不是微信"
    }
})
// 接受信息
router.post('/wechat', ctx => {
    const { xml: msg } = ctx.request.body
    const { query } = url.parse(ctx.url, true)
    const {
        signature,
        timestamp,
        nonce,
        echostr
    } = query
    let str = [conf.token, timestamp, nonce].sort().join('')
    // app._io.emit('chat',msg.Content)
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex')
    //签名对，相同则按照微信要求返回echostr参数值
    const builder = new xml2js.Builder()
    let result = null
    if (signature == strSha1) {
        result = builder.buildObject({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: 'Hello ' + msg.Content
            }
        })
    } else {
        result = builder.buildObject({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: '你不是微信'
            }
        })
    }
    ctx.body = result
})
/** 基础环境 配置结束 */

const tokenCache = {
    access_token: "",
    updateTime: Date.now(),
    expires_in: 7200
}
router.get('/getTokens', async ctx => {
    const wxDomain = `https://api.weixin.qq.com`
    const path = `/cgi-bin/token`
    const param = `?grant_type=client_credential&appid=${conf.appID}&secret=${conf.appsecret}`
    const url = wxDomain + path + param
    const res = await axios.get(url)
    Object.assign(tokenCache, res.data, {
        updateTime: Date.now()
    })
    // console.log(tokenCache)
    ctx.body = res.data
})
/* ---获取微信接口调用权限--- */
router.get('/OAutho/JsSdkConfig', async (ctx, next) => {
    var page = ctx.query.page;
    console.log(page)
    var t = {};
    var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + tokenCache.access_token + '&type=jsapi';
    //3、获取ticket并且生成随机字符串,时间戳,签名
    const jsdk = await axios.get(ticketUrl).then(res => {
        var timestamp = parseInt(new Date().getTime() / 1000);
        t.ticket = res.data.ticket;
        t.noncestr = sha1(new Date());
        t.timestamp = timestamp;
        var string = 'jsapi_ticket=' + t.ticket + '&noncestr=' + t.noncestr + '&timestamp=' + timestamp + '&url=' + page;
        t.signature = sha1(string);
    });
    console.log(t)
    ctx.body = t
});
const { ServerToken, ClientToken } = require('./mongoose')

/**
 * 开始进行 鉴权获取用户信息
 */

/* 鉴权 */
router.get('/wxAuthorize', async (ctx, next) => {
    const state = ctx.query.id
    console.log('ctx...' + ctx.href)
    let redirectUrl = ctx.href.replace('wxAuthorize', 'wxCallback')
    const scope = 'snsapi_userinfo'
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appID}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
    ctx.redirect(url)
})
/* 依据code 返回access_token与 用户openid*/

router.get('/wxCallback', async (ctx, next) => {
    const code = ctx.query.code
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${conf.appID}&secret=${conf.appsecret}&code=${code}&grant_type=authorization_code`
    const token = await axios.get(url)
    const openid = token.data.openid
    ClientToken.setToken(openid, token.data)
    ctx.redirect('/?openid=' + openid)
})

/* 获取当前用户信息 */

router.get('/getUser', async ctx => {
    const openid = ctx.query.openid
    const access_token = await ClientToken.getToken(openid).then(res => {
        return res.access_token
    })
    console.log(access_token)
    const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    const userinfo = await axios.get(url)
    ctx.body = userinfo.data
})
// const rr = 
router.get('*', ctx => {
    ctx.redirect('/')
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)