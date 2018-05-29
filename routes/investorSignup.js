let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
const nodemailer = require('nodemailer');

router.post('/',function (req,res) {
    console.log(req.body);
    let investorSchema = Schema.investor({
        NoActiveMember: req.body.NoActiveMember,
        FullName: req.body.FullName,
        Email: req.body.Email,
        LinkedInUrl: req.body.LinkedInUrl,

        //Investor's Company Information
        CompanyName: req.body.CompanyName,
        InvestorGroupType: req.body.InvestorGroupType,
        RoleInCompany: req.body.RoleInCompany,
        CompanyWebsite: req.body.CompanyWebsite,
        InvestmentFocusSector: req.body.InvestmentFocusSector,
        CompanyCity: req.body.CompanyCity,
        AboutCompany: req.body.AboutCompany,
        AmountToInvest: req.body.AmountToInvest,

        //User Information
        UserID: req.body.UserID,
        Password: req.body.Password,
        Type: "Investor"
    });
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        secure: false, // true for 465, false for other ports
        auth: {
            user: "MoneyGust101@gmail.com", // generated ethereal user
            pass: "MoneyGust@123" // generated ethereal password
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: 'MoneyGust101@gmail.com', // sender address
        to: investorSchema.Email, // list of receivers
        subject:'MoneyGust Autogenerated Mail (do not reply)', // Subject line
        text: 'Thank you for joining MoneyGust.',
        html:  '<b>Thank you for joining MoneyGust. ' +
        'We will help you in finding best startup to invest your money.</b>'

        // html body

    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
// Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});



    investorSchema.save(function (err,data) {
        if(err) throw err;
    });


    res.send("done");


});


module.exports = router;