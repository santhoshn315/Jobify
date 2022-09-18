import { StatusCodes } from "http-status-codes";
import customAPIEror from "./customAPI.js";

class BadRequestError extends customAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
