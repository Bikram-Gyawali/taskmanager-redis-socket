import React, { useState, useEffect } from "react";
import "./task.css";
import { Modal } from "react-responsive-modal";
import { Socket } from "socket.io-client";
function Task(props) {
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    props.socket.emit("openWorkspace", props.selectedWorkspace);
    props.socket.on("allTasks", (tasks) => {
      setTaskList(tasks);
    });
  }, []);

  useEffect(() => {
    const taskListner = ({ task }) => {
      setTaskList((oldList) => [...oldList, task]);
    };
    props.socket.on("newTask", taskListner);
    return () => props.socket.off("newTask", taskListner);
  });

  const addNewTask = () => {
    let newTask = {
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      status: "Unassigned",
      assignedTo: "None",
      workspaceName: props.selectedWorkspace.name,
    };
    props.socket.emit("addTask", newTask);
    setOpen(false);
  };

  return (
    <div>
      <div className="task-header">
        <p>Tasks for {props.selectedWorkspace.name}</p>
        <button onClick={onOpenModal}>Add New Task</button>
      </div>
      <div className="task-body">
        {taskList.length > 0 ? (
          taskList.map((task, id) => {
            return (
              <div
                className="tasks"
                key={id}
                // onClick={() => props.setTask(task)}
              >
                <div className="task-details">
                  <p className="task-name">{task.name}</p>
                  <br />
                  <p className="task-desc">{task.description}</p>
                </div>
                <div className="task-status">
                  <p className="task-name">Status: {task.status}</p>
                  <br />
                  <p className="task-desc">Assigned To: {task.assignedTo}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No tasks created</p>
        )}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-body">
          <h2>Create New Task</h2>
          <form className="contact-form" noValidate="noValidate">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Task Name"
                required=""
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="desc"
                id="desc"
                placeholder="Task Details"
                required=""
              />
            </div>
            <input
              className="new-btn"
              id="add_task"
              type="button"
              value="Add Task"
              onClick={addNewTask}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Task;
