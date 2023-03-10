const axios = require("axios");
const apiResponse = require("../helpers/apiResponse");
const telegram = require("../middlewares/telegram");
const jwt = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const serviceAliveNoti = async () => {
	try {
		await axios.get(`${process.env.FACIAL_SERVER_AI}/healthcheck`)
			.then(async (dataRes) =>  {
				console.log('--- healthcheck cronjob ---', JSON.stringify(dataRes.data));
				await telegram.sendNotification(dataRes.data);
			}).catch(async (error) => {
				await telegram.sendNotification(JSON.stringify(error));
				console.log(error);
			});
	} catch (err) {
		//throw error in json response with status 500. 
		await telegram.sendNotification(err);
		return apiResponse.ErrorResponse(res, err);
	}
}

const serviceAliveFunc = async (req, res) => {
	try {
		await axios.get(`${process.env.FACIAL_SERVER_AI}/healthcheck`)
			.then(async (dataRes) => {
				await telegram.sendNotification(dataRes.data);
				return apiResponse.successResponseWithData(res,"Success", dataRes.data);
			}).catch(async (error) => {
				console.log(error);
				await telegram.sendNotification(error);
				return apiResponse.ErrorResponse(res, error);
			});
	} catch (err) {
		//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
	}
}

/**
 * Check service alive.
 * 
 * @returns {Object}
 */
const serviceAlive = [
	serviceAliveFunc
];

/**
 * Book List.
 * 
 * @returns {Object}
 */
const cameraAlive = [
	jwt,
	function (req, res) {
		try {
			axios.get(`${process.env.FACIAL_SERVER_AI}/healthcheck`)
                .then((response) => {
                    return apiResponse.successResponseWithData(res,"Success", dataRes.data);
                }).catch((error) => {
                    console.log(error);
					return apiResponse.ErrorResponse(res, error);
                });
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

module.exports = {
	cameraAlive,
	serviceAlive,
	serviceAliveFunc,
	serviceAliveNoti
}