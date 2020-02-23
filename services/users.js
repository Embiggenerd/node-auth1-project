const registerUser = UserModel => (name, password) => UserModel('users')
    .insert({ name, password })

const getUserByName = UserModel => name => UserModel('users')
    .select('password', 'id')
    .where({ name })

const getAllUsers = UserModel => () => UserModel('users')

module.exports = (UserModel) => ({
    registerUser: registerUser(UserModel),
    getUserByName: getUserByName(UserModel),
    getAllUsers: getAllUsers(UserModel)
})