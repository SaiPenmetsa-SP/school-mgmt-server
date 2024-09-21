import express from "express";
import cors from "cors";
import { rolesRouter } from "./routes/roles.js";
import { userCredentials, userName } from "./routes/studentLogin.js";
import { loginRouter } from "./routes/Login.js";
import { formRouter } from "./routes/Form.js";
import { homeRouter } from "./routes/HomePage.js";
import { taskPost } from "./routes/studentTasks.js";
import { taskGet } from "./routes/studentTasks.js";
import { studentF } from "./routes/studentTasks.js";

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

app.use("/data", rolesRouter);

app.use("/checkusername", userName);

app.use("/confirmpassword", userCredentials);

app.use("/login", loginRouter);

app.use("/formSubmit", formRouter);

app.use("/homedata", homeRouter);

app.use("/addTasks", taskPost);

app.use("/", taskGet);

app.use("/", studentF);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
