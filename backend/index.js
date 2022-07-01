const { Socket } = require("socket.io");
const redis = require("redis");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
require("dotenv").config();

const { setTasks, getTasks, getAllTasks, addTask } = require("./manager/tasks");
const {
  setWorkSpace,
  getMyWorkSpace,
  addNewWorkSpace,
} = require("./manager/workspaces");

let workspaceList = [];
let taskList = [];

let redisClient = redis.createClient({
  host: "taskmanager",
  port: 6379,
  password: "redis1manager",
  url: "redis://localhost:6379",
});

redisClient.connect();

redisClient.get("workspaces", (error, workspaces) => {
  if (error) console.log(error);
  workspaceList = workspaces;
});

setWorkSpace(workspaceList);

redisClient.get("tasks", (error, tasks) => {
  if (error) console.log(error);
  taskList = task;
});

setTasks(taskList);

io.on("connection", (socket) => {
  socket.on("login", () => {
    io.emit("allWorkspacecs", getMyWorkSpace());
  });

  socket.on("openWorkspace", (workspace) => {
    socket.join(workspace.name);
    io.in(workspace.name).emit("allTasks", getTasks(workspace.name));
  });

  socket.on("addWorkspace", (workspace) => {
    addNewWorkSpace(workspace);
    io.emit("newWorkspace", { workspace });
    redisClient.set("workspaces", getMyWorkSpace());
  });
});

socket.on("disconnect", () => {
  console.log("User disconnected");
});

http.listen(5000, function () {
  console.log("Listening on port 5000");
});
