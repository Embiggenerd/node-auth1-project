const { Router } = require('express')

router = Router()


router.post('/register', async (req, res, next) => {
    try {
        res.json()
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