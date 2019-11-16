let fs
let path
if(window.require){
  fs = window.require('fs')
  path = window.require('path')
}
console.log(fs)
console.log(path)
let filePath = path.resolve('./Plugin');
let plugin = []

function guid() {
  /**
   * @return {string}
   */
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function (filename) {
        let fileDir = path.join(filePath, filename);
        fs.stat(fileDir, function (error, stats) {
          if (error) {
            console.warn('获取文件stats失败');
          } else {
            let isDir = stats.isDirectory();
            if (isDir) {
              let content = fs.readFileSync(`${fileDir}/info.json`, 'utf-8');
              let data = JSON.parse(content)
              plugin.push({
                id: guid(),
                pluginName: data.pluginName,
                author: data.author,
                type: data.type,
                main: data.main,
                keys: data.keys,
                icon: `${fileDir}/${data.icon}`,
                run: window.require(`${fileDir}/${data.main}`)
              })
              console.log('插件初始化完成:' + data.pluginName)
            }
          }
        })
      });

    }
  });
}

export default {
  run(search) {
    let params = search.split(' ')
    let result = []
    plugin.forEach(item => {
      if ((item.keys === '*' || item.keys.toLowerCase() === params[0].toLowerCase()) && item.type.toLowerCase() === 'js') {
        let object = item.run(search)
        object.map(((tmp, index) => {
          tmp['icon'] = `${item.icon}`
        }))
        result = result.concat(object)
      }
    })
    return result
  },
  initPluginList() {
    fileDisplay(filePath)
  }
}
