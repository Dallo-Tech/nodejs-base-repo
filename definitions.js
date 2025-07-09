const user = {
  fullName: "Test Bahadur",
  email: "test@gmail.com",
  password: "password123",
};

const login = {
  email: "test@gmail.com",
  password: "password123",
};

const setRole = {
  email: "test@gmail.com",
  roleId: 1,
};

const enroll = {
  email: "test@gmail.com",
  $tutorialId: 2,
};

const role = {
  $name: "admin",
};

const resource = {
  $name: "DASHBOARD",
};

const roleResourcePermission = {
  roleId: 1,
  resources: [{ resourceId: 1, permissions: [1, 2, 3, 4] }],
};

module.exports = DEFINITIONS = {
  //login
  login,

  //enroll
  enroll,

  // role
  addRole: role,
  updateRole: { ...role, id: 1 },

  setRole,

  //user
  addUser: user,
  updateUser: { ...user, id: 1 },

  //resource
  addResource: resource,
  updateResource: { ...resource, id: 1 },

  //role resource permission
  roleResourcePermission,
};
