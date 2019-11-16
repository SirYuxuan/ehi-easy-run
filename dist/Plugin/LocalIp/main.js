let os
let exec
let iconv
if(window.require){
  os = window.require('os')
  exec = window.require('child_process').exec
  iconv = window.require('iconv-lite')
}
let main = (search) => {
  let interfaces = require('os').networkInterfaces();
  for(let devName in interfaces){
    let interface = interfaces[devName];
    for(let i=0;i<interface.length;i++){
      let alias = interface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return [{
          title:"IP",
          subTitle:alias.address,
          enter(){
            exec('clip').stdin.end(iconv.encode(alias.address, 'gbk'))
          }
        }];
      }
    }
  }
}
module.exports = main;
