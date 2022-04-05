var Service = require('node-windows').Service;
var svc = new Service({
 name:'WEBAPP',
 description: 'Email Notification Services',
    script: 'C:\\APPTech\\EmailAPI\\EmailNotification\\Index.js'
});

svc.on('install',function(){
    svc.start();
});

svc.install();