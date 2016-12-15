/**
 * Created by jun on 2016/12/15.
 */

/**
 * @author  info_together@aliyun.com
 * @description 显示历史记录 NeDB嵌入式数据库
 * @param
 * @return
 */

/*NeDB*/
const ipcRenderer = require('electron').ipcRenderer;
/*reload*/
var reload = document.getElementById('reload');
reload.addEventListener('click', function () {
    location.reload();
}, false)

var addRecord = document.getElementById('addRecord');
addRecord.addEventListener('click', function () {

    var input_type = document.getElementById('input-type').value,
        input_result = document.getElementById('input-result').value,
        input_time = document.getElementById('input-time').value;
    if (input_type || input_result || input_time) {
        ipcRenderer.send('save-db', input_type, input_result, input_time);
        location.reload()
    }


}, false);

var delAll = document.getElementById('delAllRecord');
delAll.addEventListener('click', function () {
    ipcRenderer.send('delete-All-item');

    ipcRenderer.on('receive-num', function (err, numRemoved) {
        var np2 = document.createElement('p')
        np2.innerHTML += "全部记录已删除。一共删除了" + numRemoved + "条数据";
        // alert(numRemoved);
        var containner = document.getElementById('result');

        containner.appendChild(np2);

    })

    // location.reload();
}, false)

ipcRenderer.send('find-items', 'decode');

ipcRenderer.on('receive-result', function (err, docs) {

    // console.log(docs);
    var np = document.createElement('div')
    np.className = 'test'
    let aa = JSON.stringify(docs)
    var html = ""
    for (var item in docs) {
        np.innerHTML += '<div class="main">' +
            '<div class="type">' + docs[item].type + '</div>'
            + '<div class="result">' + docs[item].result + '</div>'
            + '<div class="recentTime">' + docs[item].recentTime + '</div>'
            + '</div>'
            + '\n';
    }
    var containner = document.getElementById('main-container');

    containner.appendChild(np);

})



 
