
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(bodyParser.json());
app.use(cors());




app.get('/Emai?', (req, res) => {
	var oEmailTo="";
	var oDocNum = req.query.value2;
	var oName=req.query.value3;
	var oRemarks = req.query.value4;
	if(req.query.value1===""){
		res.send('No Email Available').status(404);
	}else{
		oEmailTo=req.query.value1;
		var nodemailer = require('nodemailer');
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'tmc.notification@apptech-experts.com',
				pass: 'BuHn5g&'
			}
		});
		var mailOptions = {
			from: 'com',
			to: oEmailTo,
			subject: ''+oDocNum+' DOCUMENT FOR APPROVAL',
			text: "TEST",
			html: "<label>Hello Approver,</label><br><p align='justify'>Please check Document for Approval.<br>You may login in to WEB PORTAL.If you're outside of the office,please click <a href='http://116.50.224.147:8080/'>here</a> to login.</p><br><br><label>Requester's Name:"+oName+"</label><br><br><br><h5>AIDEA WEB PORTAL</h5>"
		};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			res.send('Email Sent To: ' + mailOptions.to).status(200);
			}
		});
	}
});



app.listen(port, () => {
    console.log("API is running on port " + port);
})