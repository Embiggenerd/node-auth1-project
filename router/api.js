const { Router } = require('express')
router = Router()
const { encryptPass, registerUser, comparePass, getUserByName, getAllUsers } = require('../services')

router.post('/register', async (req, res, next) => {
    try {
        const { password, name } = req.body

        const hashedPassword = encryptPass(password)

        const registered = await registerUser(name, hashedPassword)

        return res.json(registered)
    } catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res, next) => {
    console.log('login ivoked')
    try {
        const { name, password } = req.body

        const [user] = await getUserByName(name)
        console.log('ppp', user)
        const authenticated = comparePass(password, user.password)
        console.log('lll', authenticated, user, name)
        if (!authenticated) {
            const wrongPass = new Error('Try Again!')
            wrongPass.httpStatusCode = 400
            throw wrongPass
        }

        req.session.userID = user.id

        return res.json({ id: user.id })
    } catch (e) {
        next(e)
    }
})

const requireAuth = async (req, res, next) => {
    console.log('sss', req.session.userID)
    try {
        if (!req.session.userID) {
            const pleaseLogIn = new Error('You are not logged in')
            pleaseLogIn.httpStatusCode = 403
            throw pleaseLogIn
        }
        req.userID = req.session.userID
        next()
    } catch (e) {
        next(e)
    }
}

router.get('/users', requireAuth, async (req, res, next) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (e) {
        next(e)
    }
})

router.get('/logout', requireAuth, (req, res, next) => {
    try {
        req.session.destroy()
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
})

module.exports = router