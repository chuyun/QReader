/**
 * Created by jun on 2016/11/23.
 */

/**
 * @author  info_together@aliyun.com
 * @description 二维码的识别
 * @param {}
 * @return {}
 */
requirejs.config({
    baseUrl: 'js/libs',
    shim: {
        jsQR: {
            deps: [],
            exports: 'jsQR'
        },
        jquery: {
            deps: [],
            exports: '$'
        },
        qrcode: {
            deps: ["jquery"],
            exports: 'qrcode'
        }
    },
    paths: {
        "jquery": "jquery.min",
        "qrcode": "qrcode.min"

    }
});

requirejs(['jsQR', 'UTF8To16', "jquery", "qrcode", 'tools'],
    function (jsQR, UTF8To16, $, qrcode, tools) {

        initCanvas(200, 200);

        var gCtx = null,
            gCanvas = null,
            imageData = null;

        function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();

        }

        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function drop(e) {
            e.stopPropagation();
            e.preventDefault();
            // alert(e.dataTransfer);
            var dt = e.dataTransfer;
            var files = dt.files;
            var reader = handleFiles(files);
            // console.log(reader);

        }

        /*NeDB*/
        const ipcRenderer = require('electron').ipcRenderer;

        /**
         * @author  info_together@aliyun.com
         * @description 处理接收的文件
         * @param {}
         * @return {}
         */
        function handleFiles(f) {
            var o = [];
            for (var i = 0; i < f.length; i++) {
                var reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function (e) {
                        // console.log("f:"+readAsDataURL(f[i]));

                        // console.log(decodeURI(e.target.result));

                        var txt = e.target.result;

                        var canvas = document.getElementById("qr-canvas");
                        var gctx = canvas.getContext('2d');
                        gctx.clearRect(0, 0, 200, 200);

                        var myImage = new Image();
                        myImage.onload = function () {
                            gctx.drawImage(myImage, 0, 0, 200, 200);
                            var myImageData = gctx.getImageData(0, 0, 200, 200);
                            gctx.clearRect(0, 0, 200, 200);
                            // console.log(myImageData.data);

                            var decoded = jsQR.decodeQRFromImage(myImageData.data, myImageData.width, myImageData.height);
                            var decode_utf16 = UTF8To16.utf8ToUtf16(decoded);
                            // console.log(UTF8To16.utf8ToUtf16(decoded));
                            // alert("二维码的信息为：\n"+ '"'+decode_utf16+ '"'+"\n已经存储到剪切板！");

                            //Electron API 写入到剪切板
                            const clipboard = require('electron').clipboard;
                            clipboard.writeText(decode_utf16);

                            // Add some documents to the collection 写入到数据库

                            let myobj = {
                                type: 'decode',
                                result: decode_utf16,
                                recentTime: tools.getNowFormatDate()
                            }
                            console.log(myobj)
                            // ipc
                            ipcRenderer.send('save-db', myobj.type, myobj.result, myobj.recentTime);


                            //根据是否是URL区分操作
                            //如果是URL链接，则在外部浏览器打开————>先弹窗
                            if (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g.test(decode_utf16) || /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/g.test(decode_utf16)) {
                                //Electron API 消息处理 ipc
                                const shell = require('electron').shell;
                                const ipc = require('electron').ipcRenderer;

                                ipc.send('open-information-dialog', decode_utf16);
                                ipc.on('information-dialog-selection', function (event, index) {
                                    if (index === 0) {
                                        shell.openExternal(decode_utf16);
                                    }
                                    else {

                                    }
                                })
                            } else {
                                //When is Not URL
                                if (decode_utf16 != undefined) {

                                    // alert("二维码的信息为：\n"+ '"'+decode_utf16+ '"'+"\n已经存储到剪切板！");
                                    const ipc = require('electron').ipcRenderer;
                                    ipc.send('open-info-dialog', decode_utf16);
                                    ipc.on('information-dialog-selection', function (event, index) {
                                        if (index === 0) {
                                            //   doNothing
                                        }
                                    })
                                } else {
                                    const ipc = require('electron').ipcRenderer;
                                    ipc.send('open-err-dialog')
                                    ipc.on('err-dialog-selection')
                                }
                            }
                        };
                        //这个必须放在myImage.onload()函数后面
                        myImage.src = txt;
                    };
                })(f[i]);
                // Read in the image file as a data URL.
                reader.readAsDataURL(f[i]);
                // console.log(reader.result);
                return reader;
            }
        }

        /**
         * @author  info_together@aliyun.com
         * @description 初始化  暂时未完善
         * @param {}
         * @return {}
         */
        function init(file) {
            if (/image\/\w/g.test(file.type)) {

            } else if (0) {

            }
        }

        function readAsDataURL(file) {
            //检验是否为图像文件
            // var file = document.getElementById("file").files[0];
            if (!/image\/\w+/g.test(file.type)) {
                alert("看清楚，这个需要图片！");
                return false;
            }
            var reader = new FileReader();
            //将文件以Data URL形式读入页面
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                // var result=document.getElementById("result");
                //显示文件
                // result.innerHTML='<img src="' + this.result +'" alt="" />';
                // alert(this.result);

            }
        }

        /**
         * @author  info_together@aliyun.com
         * @description 初始化Canvas
         * @param {}
         * @return {}
         */
        function initCanvas(ww, hh) {
            gCanvas = document.getElementById("qr-canvas");
            gCanvas.addEventListener("dragenter", dragenter, false);
            gCanvas.addEventListener("dragover", dragover, false);
            gCanvas.addEventListener("drop", drop, false);

            var w = ww;
            var h = hh;
            gCanvas.style.width = w + "px";
            gCanvas.style.height = h + "px";
            gCanvas.width = w;
            gCanvas.height = h;
            gCtx = gCanvas.getContext("2d");
            gCtx.clearRect(0, 0, w, h);
            imageData = gCtx.getImageData(0, 0, 200, 200);

            // console.log(imageData);
            // console.log(jsQR.decodeQRFromImage(imageData.data,imageData.width,imageData.height));
        }

    });