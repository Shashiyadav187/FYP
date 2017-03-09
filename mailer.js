var config = require('./config')();
var nodemailer = require('nodemailer');
/*var util = require('util');
var emailTemplate = require('./emailTemplateHandler');
var fs = require('fs');*/

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: config.mail.userEmail,
        pass: config.mail.password
    },
    secure: false
});

var mailOptions = {
    to: config.mail.receiver_email,
    from: config.mail.sender_email,
    subject: 'Email Confirmation Request',
    html: 'This is an auto generated email',
    text: 'This the the text of the auto generated email'
};

exports.sendEmail = function(){
    return transporter.sendMail(mailOptions, function(err,info){
        if(err){
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
    });
};

/*exports.sendRehearsalRequest = function(data) {
    var filename = require.resolve('./rehearsalEmailTemplate.html');
    var file = fs.readFileSync(filename, 'utf8');
    return transporter.sendMail({
                    to: config.mail.receiver_email,
                    from: config.mail.sender_email,
                    subject: 'Disaster Recovery Scheduler Request',
                    html: 'This is the plain text version'
                    /!*html: emailTemplate.generateTemplateData({  rehearsal: data.rehearsal,
                                                                template: file,
                                                                url: config.web.host
                                                            })*!/
            });
};*/

/*exports.sendRegistrationNotification = function (recipient){
    console.log(recipient);
    return transporter.sendMail({
        to: config.mail.dashboard_admin,
        from: 'dec@hpe.com',
        subject: util.format('%s requested access to Sales Engagement Dashboard (%s)', recipient, process.env.NODE_ENV),
        html: util.format('<a href="%s">Login</a> to the dashboard to setup their account', config.web.host)
    });
};*/

