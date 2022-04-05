const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3002;
app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: true 
  }));
  
app.use(cors());
app.use(function (req, res, next) {
	let allowedOrigins = [
    "http://localhost:8081",
    "http://localhost:3002",
    "http://192.168.137.1:5501",
    "http://52.77.119.194:3002",
    "http://192.168.137.1:5500",
    "https://digitalhub.dlsl.edu.ph"];
	let origin = req.headers.origin;
	 if (allowedOrigins.includes(origin)) {
		 res.setHeader('Access-Control-Allow-Origin', origin);
	 }
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	 res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	 res.setHeader('Access-Control-Allow-Credentials', true);
	 next();
 });


app.get('/test', (req, res) => {
    res.send('ok');
});


app.post('/RequestorToApprover', (req, res) => {
    for(var i = 0;i < req.body.length;i++){ 
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sap.notification@dlsl.edu.ph',
        pass: 'P@ssw0rd2022'
    }
    });

    var mailOptions = {
        from: 'sap.notification@dlsl.edu.ph',
        to: req.body[i].receiver,
        subject: req.body[i].Subject + ' SUBMITTED FOR APPROVAL:' + req.body[i].DocumentNo,
        text: "",
        html: "<label>Hello " + req.body[i].Approver + ",<br><p align='justify'>Document No:<u>" + req.body[i].DocumentNo + 
        "</u> has been submitted for your approval. Details are as follows:.<br>" +
        "<br><br>Payee Name/Requestor Name: "+ req.body[i].Payee +
        "<br>Chargeable to: " + req.body[i].Department + 
        "<br>Amount: " + req.body[i].Amount +
        "<br>Remarks: " + req.body[i].Remarks +
        "<br>Notes: " + req.body[i].Notes +
        "<br>Date Submitted: " +  req.body[i].Date + 
        "<br><br>Please click <a href='https://digitalhub.dlsl.edu.ph/index.html'>here</a> and Go To <b>Approval Decision Tab</b> to review / approve the request." + 
        "<br><br>This is a system generated message. For further inquiries, please email servicedesk.sso@dlsl.edu.ph" + 
        "</label>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + mailOptions.to);
        res.send('Email Sent To: ' + mailOptions.to).status(200);
        }
    });
  }
});


app.post('/ApproverToRequestor', (req, res) => {
    for(var i = 0;i < req.body.length;i++){ 
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sap.notification@dlsl.edu.ph',
        pass: 'P@ssw0rd2022'
    }
    });

    var mailOptions = {
        from: 'sap.notification@dlsl.edu.ph',
        to: req.body[i].receiver,
        subject: req.body[i].Subject + ' SUBMITTED FOR APPROVAL:' + req.body[i].DocumentNo,
        text: "",
        html: "<label>Hello " + req.body[i].Originator + 
        ",<br><p align='justify'>Document No:<u>" + req.body[i].DocumentNo + "</u>  has been approved by (" + req.body[i].Approver + ").<br>" +
        "<br><br>Payee Name/Requestor Name:"+ req.body[i].Payee +
        "<br>Chargeable to:" + req.body[i].Department + 
        "<br>Amount: " + req.body[i].Amount +
        "<br>Remarks: " + req.body[i].Remarks +
        "<br>Notes: " + req.body[i].Notes +
        "<br>Date of Last Approval: " +  req.body[i].Date +  "<br>" +
        "<br>For payment request, payment will be processed via preferred channel within 3 working days after approval." + 
        "<br>For inventory request, you may proceed to the warehouse to draw your requested items." + 
        "<br>For purchase request, please wait for CPD’s advise on delivery or bidding schedule." + 
        "<br><br>This is a system generated message. For further inquiries, please email servicedesk.sso@dlsl.edu.ph" + 
        "</label>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + mailOptions.to);
        res.send('Email Sent To: ' + mailOptions.to).status(200);
        }
    });
  }
});


app.post('/ApproverToNextApprover', (req, res) => {
    for(var i = 0;i < req.body.length;i++){ 
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sap.notification@dlsl.edu.ph',
        pass: 'P@ssw0rd2022'
    }
    });

    var mailOptions = {
        from: 'sap.notification@dlsl.edu.ph',
        to: req.body[i].receiver,
        subject: req.body[i].Subject + ' APPROVAL DOCUMENT NO:' + req.body[i].DocumentNo,
        text: "",
        html: "<label>Hello " + req.body[i].Approver + 
        ",<br><p align='justify'>Document No:<u>" + req.body[i].DocumentNo + "</u>  has been approved by (" + req.body[i].Approver + ").<br>" +
        "<br><br>Payee Name/Requestor Name:"+ req.body[i].Payee +
        "<br>Chargeable to:" + req.body[i].Department + 
        "<br>Amount: " + req.body[i].Amount +
        "<br>Remarks: " + req.body[i].Remarks +
        "<br>Notes: " + req.body[i].Notes +
        "<br>Date of Last Approval: " +  req.body[i].Date + "<br>" +
        "<br>For payment request, payment will be processed via preferred channel within 3 working days after approval." + 
        "<br>For inventory request, you may proceed to the warehouse to draw your requested items." + 
        "<br>For purchase request, please wait for CPD’s advise on delivery or bidding schedule." + 
        "<br><br>This is a system generated message. For further inquiries, please email servicedesk.sso@dlsl.edu.ph" + 
        "</label>"  };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + mailOptions.to);
        res.send('Email Sent To: ' + mailOptions.to).status(200);
        }
    });
  }
});

app.post('/OriginatorEmailRejection', (req, res) => {
    for(var i = 0;i < req.body.length;i++){ 
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sap.notification@dlsl.edu.ph',
        pass: 'P@ssw0rd2022'
    }
    });

    var mailOptions = {
        from: 'sap.notification@dlsl.edu.ph',
        to: req.body[i].receiver,
        subject: req.body[i].Subject + ' REJECTION : DOCUMENT NO:' + req.body[i].DocumentNo,
        text: "",
        html: "<label>Hello " + req.body[i].Approver + 
        ",<br><p align='justify'>Document No: <u>" + req.body[i].DocumentNo + "</u>  has been rejected by (" + req.body[i].Approver + ").<br>" +
        "<br><br>Payee Name/Requestor Name: "+ '' +
        "<br>Chargeable to: " + '' + 
        "<br>Amount: " + '' +
        "<br>Remarks: "  + req.body[i].Remarks +
        "<br>Notes: " + req.body[i].Notes +
        "<br>Date of Last Approval: "  +  req.body[i].Date + 
        "<br>For payment request, payment will be processed via preferred channel within 3 working days after approval." + 
        "<br>For inventory request, you may proceed to the warehouse to draw your requested items." + 
        "<br>For purchase request, please wait for CPD’s advise on delivery or bidding schedule." + 
        "<br><br>This is a system generated message. For further inquiries, please email servicedesk.sso@dlsl.edu.ph" + 
        "</label>"};
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + mailOptions.to);
        res.send('Email Sent To: ' + mailOptions.to).status(200);
        }
    });
  }
});


app.post('/OTPCode', (req, res) => {
    for(var i = 0;i < req.body.length;i++){ 
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sap.notification@dlsl.edu.ph',
        pass: 'P@ssw0rd2022'
    }
    });

    var mailOptions = {
        from: 'sap.notification@dlsl.edu.ph',
        to: req.body[i].receiver,
        subject: "CHANGE PASSWORD REQUEST",
        text: "",
        html: "<label>Hello, " +
        "<br>" + 
        "<br>You have initiated a password reset for Finance and Supply Chain Digital Hub. Please enter this One Time Password (OTP) to verify your identity and proceed with nominating your" + 
        "<br>new password. OTP is valid within 3 minutes" + 
        "<br>" +  
        "<br>OTP Code is: <b>" + req.body[i].OTPCode + "</b>" +
        "<br>" +  
        "<br>" +  
        "<br>Thank you very  much<br>This is a system generated message. For further inquiries, please email servicedesk.sso@dlsl.edu.ph" + 
        "</label>"};
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + mailOptions.to);
        res.send('Email Sent To: ' + mailOptions.to).status(200);
        }
    });
  }
});


app.listen(port, () => {
    console.log("API is running on port " + port);
})