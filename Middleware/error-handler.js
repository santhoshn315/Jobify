import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const DefaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong,please try again later",
  };
  if (err.name === "ValidationError") {
    DefaultError.statusCode = StatusCodes.BAD_REQUEST;
    //DefaultError.msg = err.message;
    DefaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    DefaultError.statusCode = StatusCodes.BAD_REQUEST;
    DefaultError.msg = `${Object.keys(
      err.keyValue
    )} field email has to be unique`;
  }

  res.status(DefaultError.statusCode).json({ msg: DefaultError.msg });
};

export default errorHandlerMiddleware;
