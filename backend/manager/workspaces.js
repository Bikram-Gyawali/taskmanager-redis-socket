let workspaceList = [];

const setWorkSpace = (workspace) => {
  workspaceList = workspace;
};

const addNewWorkSpace = (workspace) => {
  workspace.push(workspace);
  return "New WorkSpace Added to list";
};

const getMyWorkSpace = () => {
  return workspace;
};

module.exports = { setWorkSpace, addNewWorkSpace, getMyWorkSpace };
