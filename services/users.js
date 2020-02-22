const registerUser = UserModel => (name, password) => UserModel.insert({ name, password })

const getPassByName = UserModel => name => UserModel
    .select('password', 'id')
    .where({ name })

module.exports = (UserModel) => ({
    registerUser: registerUser(UserModel),
    getPassByName: getPassByName(UserModel)
})