const { Router } = require('express')
router = Router()
const { encryptPass, registerUser, comparePass, getUserByName } = require('../services')

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
        const { name, password } = req.body

        const [user] = await getUserByName(name)

        const authenticated = comparePass(password, user.password)

        if (!authenticated) {
            const wrongPass = new Error('Try Again!')
            wrongPass.httpStatusCode = 400
            throw wrongPass
        }

        if (req.session) {
            req.session.userID = user.id
        } else {
            const sessionBroken = new Error('express-session not working')
            throw sessionBroken
        }

        res.json({id:user.id})
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