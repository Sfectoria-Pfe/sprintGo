const { findOne } = require("../Models/workSpaceModel");
const WorkspaceModel = require("../Models/workSpaceModel");
const userModel = require("../Models/userModel");

const create = async (req, callback) => {
  try {
    const { title, ID, members } = req.body;
    // Create and save new Workspace
    let newWorkspace = WorkspaceModel({ title, ID, members });
    newWorkspace.save();

    const user = await userModel.findById(req.user.id);
    user.Workspaces?.unshift(newWorkspace.id);
    await user.save();

    // Add user to members of this Workspace
    let allMembers = [];
    allMembers.push({
      user: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      color: user.color,
      role: "owner",
    });
    await Promise.all(
      members?.map(async (member) => {
        const newMember = await userModel.findOne({ email: member.email });
        newMember.Workspaces.push(newWorkspace._id);
        await newMember.save();
        allMembers.push({
          user: newMember._id,
          name: newMember.name,
          surname: newMember.surname,
          email: newMember.email,
          color: newMember.color,
          role: "member",
        });
        newWorkspace.activity.push({
          user: user.id,
          name: user.name,
          action: `added user '${newMember.name}' to this Workspace`,
        });
      })
    );
    newWorkspace.activity?.unshift({
      user: user._id,
      name: user.name,
      action: "created this workspace",
      color: user.color,
    });

    // Save new Workspace
    newWorkspace.members = allMembers;
    await newWorkspace.save();

    return callback(false, newWorkspace);
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};
const getAll = async (userId, callback) => {
  try {
    // Get user
    const user = await userModel.findById(userId);

    // Get Workspace's ids of user
    const Workspace = user.Workspaces;

    // Get Workspaces of user
    const Workspaces = await WorkspaceModel.find({
      _id: { $in: WorkspaceIds },
    });

    // Delete unneccesary objects
    Workspaces.forEach((Workspace) => {
      Workspace.activity = undefined;
      Workspace.boards = undefined;
    });

    return callback(false, Workspaces);
  } catch (error) {
    return callback({ msg: "Something went wrong", details: error.message });
  }
};
const getById = async (id, callback) => {
  try {
    // Get Workspace by id
    const Workspace = await WorkspaceModel.findById(id);
    return callback(false, Workspace);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const getActivityById = async (id, callback) => {
  try {
    // Get Workspace by id
    const Workspace = await WorkspaceModel.findById(id);
    return callback(false, Workspace.activity);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateWorkspaceTitle = async (WorkspaceId, title, user, callback) => {
  try {
    // Get Workspace by id
    const Workspace = await WorkspaceModel.findById(WorkspaceId);
    Workspace.title = title;
    Workspace.activity?.unshift({
      user: user._id,
      name: user.name,
      action: "update title of this Workspace",
      color: user.color,
    });
    await Workspace.save();
    return callback(false, { message: "Success!" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const addMember = async (id, members, user, callback) => {
  try {
    // Get Workspace by id
    const Workspace = await WorkspaceModel.findById(id);

    // Set variables
    await Promise.all(
      members?.map(async (member) => {
        const newMember = await userModel.findOne({ email: member.email });
        newMember.Workspaces.push(Workspace._id);
        await newMember.save();
        Workspace.members.push({
          user: newMember._id,
          name: newMember.name,
          surname: newMember.surname,
          email: newMember.email,
          color: newMember.color,
          role: "member",
        });
        //Add to Workspace activity
        Workspace.activity.push({
          user: user.id,
          name: user.name,
          action: `added user '${newMember.name}' to this Workspace`,
          color: user.color,
        });
      })
    );
    // Save changes
    await Workspace.save();

    return callback(false, Workspace.members);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getActivityById,
  updateWorkspaceTitle,

  addMember,
};
