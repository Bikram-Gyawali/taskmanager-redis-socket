import React, { useState } from "react";

import Task from "./Task";
import Workspaces from "./Workspace";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Body() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  return (
    <div className="body-main">
      <div
        className="wp-link"
        onClick={() => {
          setSelectedWorkspace(null);
        }}
      >
        Workspaces
      </div>
      {!selectedWorkspace ? (
        <Workspaces
          socket={socket}
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={setSelectedWorkspace}
        />
      ) : (
        <Task socket={socket} selectedWorkspace={selectedWorkspace} />
      )}
    </div>
  );
}

export default Body;
