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

