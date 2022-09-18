import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import jobsRouter from "./routes/jobRoute.js";
import notFoundMiddleware from "./Middleware/Not-found.js";
import errorHandlerMiddleware from "./Middleware/error-handler.js";
import authenticateUser from "../client/Middleware/auth.js";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet"; 
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize";
dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.get("/", (req, res) => {
//   res.json({ msg: "hello" });
// });
// app.get("/api/v1", (req, res) => {
//   res.json({ msg: "hello" });
// });
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(express.static(path.resolve(__dirname, "./jobify/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./jobify/build", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
