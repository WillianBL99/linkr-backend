import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import router from "./routes/index.js";

const app = express();

app.use(cors())
app.use(json());
app.use(router);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});