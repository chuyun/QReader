/**
 * Created by jun on 2016/12/15.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

const ipcMain = require('electron').ipcMain,
    db = require('./dbService');

const ipcService = {
    start: function () {
        // save to database
        ipcMain.on('save-db', function (event, type, result, recentTime) {
            console.log('ipc success...')
            let newObj = {
                type: type
                , result: result
                , recentTime: recentTime
            };
            // db.find({result: newObj.result}, function (err, docs) {
            //     if (docs) {
            //         // 如果数据库存在该字段，则更新数据库中改字段的查询时间
            //         db.update({result: Object.result}, {$set: {recentTime: recentTime}}, {type: newObj.type})
            //         console.log("update")
            //     } else {
            //         //  如果数据库不存在该字段，则将该字段插入到数据库中
            //         db.insert(newObj, function (err) {
            //             if(err){console.log(err)}
            //             console.log("insert")
            //
            //         })
            //
            //     }
            //
            // })

            db.insert(newObj, function (err) {
                if (err) {
                    console.log(err)
                }
                console.log("insert success")

            })

            // db.find({}, function (err, docs) {
            //     console.log("Find:")
            //     console.log(docs)
            // });
        })

        //delete recode
        ipcMain.on('delete-All-item', function (event) {
            // 删除所有记录
            db.remove({}, {multi: true}, function (err, numRemoved) {
                console.log(numRemoved);
                event.sender.send('receive-num', numRemoved);

            });
        })

        //
        ipcMain.on('find-items', function (event, type, result, time) {
            // console.log('mmmm')

            db.find({}, function (err, docs) {
                // ipcMain.send('receive-result',docs)
                // console.log(docs)
                event.sender.send('receive-result', docs)

                // event.returnValue=docs;

            })

        })
    }


}

module.exports = ipcService;


 
