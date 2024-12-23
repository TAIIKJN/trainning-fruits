import cors from "cors";
import express, { Express } from "express";

const app: Express = express();
const port = Number(process.env.PORT) || 80;
const apikey = process.env.APIKEY || "123456789";

app.use(cors());

app.use(express.static("static"));
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";

RegisterRoutes(app);
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.listen(port, () => console.log(`Application is running on port ${port}`));
