var Service = require('node-windows').Service;
var svc = new Service({
 name:'DLSL',
 description: 'Email Notification',
    script: 'C:\\APPTech\\EmailAPI\\EmailNotification\\Index.js'
});

svc.on('uninstall',function(){
    // svc.start();
    console.log('Done');
});

svc.uninstall();