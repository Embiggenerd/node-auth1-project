const registerUser = UserModel => (name, password) => UserModel.insert({ name, password })

const getUserByName = UserModel => name => UserModel
    .select('password', 'id')
    .where({ name })

module.exports = (UserModel) => ({
    registerUser: registerUser(UserModel),
    getUserByName: getUserByName(UserModel)
})