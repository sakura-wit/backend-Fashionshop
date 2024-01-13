const dotenv = require('dotenv')
dotenv.config()


"use strict";
const nodemailer = require("nodemailer");
const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace user and pass values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    console.log('orderItemsorderItems', orderItems);
    orderItems.forEach(order => {
        listItem += `<div>
    <div><img src=${order.image} alt = "sản phẩm"/></div>
    <div>Sản phẩm: <b>${order.name}</b></div>
    <div>Số lượng: <b>${order.amount}</b></div>
    <div>Với giá: <b>${order.price}</b></div>
    <div>Tổng giá: <b>${order.price * order.amount}</b></div>
    </div>`
    });
    // async..await is not allowed in global scope, must use a wrapper
    // async function main() {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'dannie022023@gmail', // sender address
        to: "nguyenvandat9a1617@gmail.com, dannie022023@gmail.com", // list of receivers
        subject: "Bạn Đã Đặt Hàng tại D&Đ Fashion Shop", // Subject line
        //text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại D&Đ Fashion Shop</b></div>${listItem}`, // html body
    })


    //console.log("Message sent: %s", info.messageId);
}

//main().catch(console.error);
module.exports = {
    sendEmailCreateOrder
}