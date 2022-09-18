import { StatusCodes } from "http-status-codes";
import customAPIEror from "./customAPI.js";

class unAuthenticated extends customAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default unAuthenticated;
