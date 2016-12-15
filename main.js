const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const dialog = require('electron').dialog
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain

const path = require('path')
const url = require('url')
// const db = require('./app/js/libs/dbService')
const ipcService=require('./app/js/libs/ipcService')

//start ipcService
ipcService.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
    // Create the browser window.
    // mainWindow = new BrowserWindow({width: 225, height: 250})
    mainWindow = new BrowserWindow({
//                                 frame: false,
                                    width: 225,
                                    height: 250,
                                    resizable: false,
                                    // frame: false
                                    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/decode.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//右键菜单
const menu = new Menu()
menu.append(new MenuItem({ label: 'Encode',click:function () {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/encode.html'),
        protocol: 'file:',
        slashes: true

    }))

}}))

menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Decode',click:function () {

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/decode.html'),
        protocol: 'file:',
        slashes: true
    }))


} }))


app.on('browser-window-created', function (event, win) {
    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })
})

ipc.on('show-context-menu', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)

})


//save 暂时取消 图片直接拖拽保存
ipc.on('save-dialog', function (event) {
    const options = {
        title: 'Save an Image',
        filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
    }
    dialog.showSaveDialog(options, function (filename) {
        event.sender.send('saved-file', filename)
    })
})

ipc.on('open-information-dialog', function (event,decodeResult) {
    const options = {
        type: 'info',
        title: 'Information',
        message: "二维码内容:"+"\n"+decodeResult+"\n"+"内容已复制到剪切板" +"\n"+
        "是否在浏览器中打开该链接?",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, function (index) {
        event.sender.send('information-dialog-selection', index)
    })
})

//
ipc.on("open-info-dialog",function (event,decodeResult) {
    const options={
        type:"info",
        tittle:"information",
        message: "二维码内容:"+"\n"+decodeResult+"\n"+"内容已复制到剪切板" +"\n",
        buttons: ['Done']
    }
    dialog.showMessageBox(options, function (index) {
        event.sender.send('info-dialog-selection', index)
    })

})

//
ipc.on("open-err-dialog",function (event) {
    const options={
        type:"error",
        tittle:"WARNING",
        message: "二维码解析失败，请确认拖入的是否为二维码！"

    }
    dialog.showMessageBox(options, function () {
        event.sender.send('err-dialog-selection');
    })
})

//Menu
let template = [{
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function (win) {
                        if (win.id > 1) {
                            win.close()
                        }
                    })
                }
                focusedWindow.reload()
            }
        }
    },{

        label:"Encode",
        accelerator: 'CmdOrCtrl+E',
        click:function () {
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'app/encode.html'),
                protocol: 'file:',
                slashes: true
            }))

        }

    },{
        label:"Decode",
        accelerator: 'CmdOrCtrl+D',
        click:function () {
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'app/decode.html'),
                protocol: 'file:',
                slashes: true
            }))
        }

    },{
        label:'History',
        accelerator: 'CmdOrCtrl+L',
        click:function () {
            const modalPath=path.join('file://', __dirname, 'app/showHistory.html')
            let win=new BrowserWindow({
                width:400,
                height:320,
                resizable: false
                // frame:false
            })

            win.on("close",function () {
                win=null
            })
            win.loadURL(modalPath)
            win.show();
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function () {
            app.emit('activate')
        }

    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'Learn More',
        click: function () {
            electron.shell.openExternal('http://chuyun.github.io')
        }
    },{
        label:"Introduce",
        click:function () {
            const modalPath=path.join('file://', __dirname, 'app/modal.html')
            let win=new BrowserWindow({
                width:400,
                height:320,
                resizable: false
                // frame:false
            })

            win.on("close",function () {
                win=null
            })
            win.loadURL(modalPath)
            win.show();
        }
    }]
}]

function addUpdateMenuItems (items, position) {
    if (process.mas) return

    const version = electron.app.getVersion()
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }, {
        label: 'Checking for Update',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'Check for Update',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            require('electron').autoUpdater.checkForUpdates()
        }
    }, {
        label: 'Restart and Install Update',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function () {
            require('electron').autoUpdater.quitAndInstall()
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
                app.quit()
            }
        }]
    })

    // Window menu.
    template[3].submenu.push({
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    })

    addUpdateMenuItems(template[0].submenu, 1)

}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false

})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true

})

