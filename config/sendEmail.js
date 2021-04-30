const mailer = require('nodemailer');
const chalk = require('chalk');
// const log = console.log;
const {logsOld: log} = require('../public');

let transpoter = mailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secureConnection: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: 'Leenu_s@163.com',
        pass: 'OWIQUENYHFVJHHXR'
    }
});
var musicNum, conmmentNum, runTime = 0;

function sendEmail(musicNum, conmmentNum, runTime, trueCommentNum) {
    var sendHtml = `<div>
                        <div>音乐总数：${musicNum}</div><br>
                        <div>评论数：${conmmentNum}</div><br>
                        <div>真实保存评论数：${trueCommentNum}</div><br>
                        <div>运行时间：${runTime}</div><br>
                        <div>********* END *********</div><br>
                    </div>`;
    var mailOptions = {
        from: 'Leenu_s@163.com',
        to: "15166089918@163.com",
        subject: "W4J程序运行通知",
        html: sendHtml
    };
    transpoter.sendMail(mailOptions, (err, info = {}) => {
        if (err) {
            return log(chalk.red("**********", "邮件发送失败", "END", "**********"));
        }
        log(chalk.blue("**********", "邮件发送成功", "END", "**********"));
    })
}

module.exports = sendEmail;
