const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class ExpiredError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.GONE;
  }
}

module.exports = ExpiredError;
