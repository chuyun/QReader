
# 二维码生成与解析软件（桌面版）

日常生活中，在电脑端一出现二维码，都要掏出手机扫码，然后将信息发给电脑，相当繁琐


该程序支持将二维码拖入程序中，返回二维码内容

更新记录：

1.0.0版本更新记录（2016-10-23）：

> 支持拖入待解析的二维码，解析出对应的结果
>
> 解析后的二维码为url时自动在内建浏览器( Chromium)中打开
>
> 使用ZXing的二维码解析库


2.0.0版本更新记录（2016-11-22）：

> 弃用Zxing的二维码解析库
>
> 采用AMD规范编码,使用require.js实现js的异步动态加载
>
> 优化应用启动速度
>
> 支持拖入网址、等其他信息，生成对应的二维码
>
> 支持直接将生成的二维码拖拽保存
>
> 支持将二维码内容发送到剪切板
>
> Encode和Decode通过右键菜单实现
>

下一版本计划

> 完善异常处理
>
> 速度优化
>
> window版本支持（暂时没有window 的node环境,mac 打包有点问题）
>
> 菜单栏(2016-11-24已添加)，后期将继续完善
>
> 还是可能会加入对条形码的支持
>
> 可能会加入对摄像头的支持
>
> 加入自动更新
>
> 其他
>
> 
>

使用说明：

> ```javascript
> //install Dependencies
> npm install 
> //start electron
> electron .
> //package electron 
> electron-packager ./ QReader --all --out build-package  --overwrite --icon=./app/image/icon/app.icns"
>
> ```
    for more infomation please visit electron official website 
    Thank you!
代码开源在Github

下载地址（window版本暂不提供）

- Mac 版（2.0.0） 
- windows版本(64位)   Coming Soon...
- windows版本(32位)   Coming Soon...  




