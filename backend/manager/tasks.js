let tasks = [];

//load all previous stored tasks
const setTasks = (taskList) => {
  tasks = taskList;
};

const addTask = (tasks) => {
  tasks.push(tasks);
  return "New Task Added";
};

const getTasks = (workspace) => {
  let allTasks = tasks.filter((task) => task.workspace === workspace);
  return allTasks;
};

const getAllTasks = () => {
  return tasks;
};

module.exports = { setTasks, addTask, getTasks, getAllTasks };
