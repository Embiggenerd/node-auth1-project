const registerUser = UserModel => (name, password) => UserModel.insert({ name, password })


module.exports = (UserModel) => ({
    registerUser: registerUser(UserModel)
})