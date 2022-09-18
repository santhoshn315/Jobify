import { StatusCodes } from "http-status-codes";
import customAPIEror from "./customAPI.js";

class NotFoundError extends customAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
