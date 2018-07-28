/**
 * Created by jun on 2016/12/15.
 */

/**
 * @author  info_together@aliyun.com
 * @description NeDB Service
 * @param
 * @return
 */

const Datastore = require('nedb');


function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const db = new Datastore({
    filename: getUserHome() + '/.electronapp/qreader/data.db',
    autoload: true
});

module.exports = db;