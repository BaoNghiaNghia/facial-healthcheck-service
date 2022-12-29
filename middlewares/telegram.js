const axios = require('axios');

require("dotenv").config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

const sendNotification = (message) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                chat_id: TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `${message}`
            };

            axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, data)
                .then((response) => {
                    resolve("done!");
                }).catch((error) => {
                    console.log(error);
                    reject(err);
                });
        } catch (e) {
            reject(e);
        }
    });
};

const sendMeAGif = () => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                chat_id: TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                animation: "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
                caption: "<b>Check out</b> my <i>new gif</i>"
            };

            axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendAnimation`, data)
                .then((response) => {
                    resolve("done!");
                }).catch((error) => {
                    console.log(error);
                    reject(err);
                });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendNotification: sendNotification,
    sendMeAGif: sendMeAGif
};
