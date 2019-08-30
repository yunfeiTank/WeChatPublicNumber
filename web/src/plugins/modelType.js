"use strict";
const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let type = null
if (isAndroid) {
    type = 0
}
if (isIOS) {
    type = 1
}
/**
 * 0 isAndroid
 * 1 isIOS
 */
export default type