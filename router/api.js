const { Router } = require('express')
router = Router()
const { encryptPass, registerUser } = require('../services')

router.post('/register', async (req, res, next) => {
    try {
        const { password, name } = req.body

        const hashedPassword = await encryptPass(password)
        console.log('hashedPassword', hashedPassword, name)
        const registered = await registerUser(name, hashedPassword)

        res.json(registered)
    } catch (e) {
        next(e)
    }
})

router.post('/login', (req, res, next) => {
    try {
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