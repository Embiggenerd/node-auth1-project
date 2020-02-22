const { Router } = require('express')
router = Router()
const { encryptPass, registerUser, comparePass, getPassByName } = require('../services')

router.post('/register', async (req, res, next) => {
    try {
        const { password, name } = req.body

        const hashedPassword = encryptPass(password)

        const registered = await registerUser(name, hashedPassword)

        res.json(registered)
    } catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const {name, password} = req.body

        const [user] = await getPassByName(name)
        // console.log(hashedPassword)
        const authenticated = comparePass(password, user.password)

        console.log('authenticated', authenticated)
        res.json('/login')
    } catch (e) {
        next(e)
    }
})

router.get('/users', (req, res, next) => {
    try {
        res.json('/users')
    } catch (e) {
        next(e)
    }
})

module.exports = router