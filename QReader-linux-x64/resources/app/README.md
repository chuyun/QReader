
# 二维码生成与解析软件（桌面版）[![Build Status](https://travis-ci.org/chuyun/QReader.svg?branch=master)](https://travis-ci.org/chuyun/QReader)

日常生活中，在电脑端一出现二维码，都要掏出手机扫码，然后将信息发给电脑，相当繁琐



该程序支持将二维码拖入程序中，返回二维码内容

下一版本，将会继续实现以下功能：

> 支持拖入网址、等其他信息，生成对应的二维码，并保存
>
> 支持将二维码内容发送到剪切板
>
> 支持输入信息，编码为二维码
>
> 可能会加入对条形码的支持


程序中使用ZXing 的qrcode.js对二维码进行解码操作

程序图标

 ![程序图标](http://blog.juncao.cc/image/pic/pages/qrcodeb.png)

程序界面

![程序界面](http://blog.juncao.cc/image/pic/pages/QRJM.png)

2.0.0版本更新记录（2016-11-22）：

> 弃用Zxing的二维码解析库，版本太老，封装比较复杂
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

2.0.0版本更新记录（2016-11-28）

> 提供windows版本支持，win上面比较奇葩，估计会有些小bug
>
> 提供Linux版本支持，未测试
>
> 菜单栏优化
>
> bug 修复

2.0.1 版本更新记录（2016-12-15）

> bug修复
>
> 更完善的错误处理
>
> 添加数据库支持（PS：采用NeDB做本地化数据存储，记录历史信息）
>
> 性能优化
>
> 功能完善

下一版本计划

> 速度优化
>
> 菜单栏(2016-11-24已添加)，后期将继续完善
>
> 还是可能会加入对条形码的支持
>
> 可能会加入对摄像头的支持
>
> 可能会加入扫描桌面二维码的功能
>
> 加入自动更新
>
> 其他
>




注：2.0.1暂时未打包window版本，需要请自行打包



    npm install

electron运行及打包脚本详见package.json





代码开源在[Github](https://github.chuyun)

下载地址

Mac版（2.0.0）  windows版（2.0.0）   Lunix版（2.0.0）

 下载地址： [百度云盘](https://pan.baidu.com/s/1nuGeBgP): 密码: rpyi




