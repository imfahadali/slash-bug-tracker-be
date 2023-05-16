const app = require("../");
const projectRoutes = require("./project");
const userRoutes = require("./user");
const uploadRoutes = require("./upload");


app.use("projects", projectRoutes);

app.use("user", userRoutes)

app.use("upload", uploadRoutes)