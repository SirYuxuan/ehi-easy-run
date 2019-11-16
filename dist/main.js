const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const Tray = electron.Tray
let win
let windowConfig = {
  width: 800,
  height: 66,
  frame: false,
  show: false,
  resizable: false,
  //显示开启node继承环境
  webPreferences: {
    nodeIntegration: true
  }
}

function createWindow() {
  win = new BrowserWindow(windowConfig)
  win.setSkipTaskbar(true)
  win.setAlwaysOnTop(true)
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools()
  win.on('ready-to-show', () => {
    win.show()
  })
  win.on('close', () => {
    win = null
  })
  //系统托盘右键菜单
  let trayMenuTemplate = [
    {
      label: '打开',
      click: function () {
        win.show()
      }
    },
    {
      label: '设置',
      click: function () {
      }
    },
    {
      label: '关于',
      click: function () {

      }
    },
    {
      label: '退出',
      click: function () {
        app.quit();
      }
    }
  ]

  //系统托盘图标目录
  let trayIcon = path.join(__dirname, 'Images');//app是选取的目录

  let appTray = new Tray(path.join(trayIcon, 'icon.ico'));//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('EhiEasyRun');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click', function () {
    win.show();
  })

}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  app.quit()
})
app.on('activate', () => {
  if (win == null) {
    createWindow()
  }
})

