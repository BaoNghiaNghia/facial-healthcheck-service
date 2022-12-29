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
				console.log('--- healthcheck cronjob ---', dataRes.data);
				await telegram.sendNotification(dataRes.data);
			}).catch((error) => {
				console.log(error);
			});
	} catch (err) {
		//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
	}
}

const serviceAliveFunc = async (req, res) => {
	try {
		await axios.get(`${process.env.FACIAL_SERVER_AI}/healthcheck`)
			.then((dataRes) => {
				console.log('---- [] ----', dataRes.data)
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

/**
 * Check service alive.
 * 
 * @returns {Object}
 */
const serviceAlive = [
	jwt,
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