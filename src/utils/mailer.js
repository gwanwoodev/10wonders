import nodemailer from "nodemailer";
import { pugEngine } from "nodemailer-pug-engine";

import "dotenv/config";


export const sendClientMail = async (content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    transporter.use("compile", pugEngine({
        templateDir: __dirname + "/../views/templates",
        pretty: true
    }));


    const emailOptions = {
        from: {
            name: "10 WGE",
            address: "help10wge@gmail.com"
        },
        to: content.clientEmail,
        subject: 'You have successfully added the product to your order sheet.',
        template: 'order-mail',
        ctx: {
            clientEmail: content.clientEmail,
            orderNumber: content.orderNumber
        }
    };

    transporter.sendMail(emailOptions);
    transporter.close();
}


export const sendEstimateMail = async (content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    transporter.use("compile", pugEngine({
        templateDir: __dirname + "/../views/templates",
        pretty: true
    }));


    const emailOptions = {
        from: {
            name: "10 WGE",
            address: "help10wge@gmail.com"
        },
        to: content.clientEmail,
        subject: 'Your estimate has arrived.',
        template: 'estimate-mail',
        ctx: {
            clientEmail: content.clientEmail,
            orderNumber: content.orderNumber
        }
    };

    transporter.sendMail(emailOptions);
    transporter.close();
}

