const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()


router.post('/registration', [
    check('email', 'Поштаны қате жаздыңыз!').isEmail(),
    check('password', 'Құпия сөзде кем дегенде 6 символ болу керек!').isLength({
        min: 6,
        max: 16
    })
], async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Қате мәлімет!'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email: email })

        if (candidate) {
            return res.status(500).json({
                message: 'Қолданушы желіде тіркелген!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 4)

        const user = new User({
            email,
            password: hashedPassword
        }) 

        await user.save()

        res.status(201).json({
            message: `Қолданушы сәтті тіркелді!`
        })

    } catch(err) {
        res.status(500).json({
            message: `Тіркелу кезінде қате орын алды!, ${err.message}`
        })
    }
})

router.post('/login', [
    check('email', 'Дұрыс поштаны енгізіңіз!').normalizeEmail().isEmail(),
    check('password', 'Құпия сөзді енгізіңіз!').exists().isLength({
        min: 6,
        max: 16
    })
], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Қате мәлімет!'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({
                message: `Қолданушы желіде табылмады`
            })
        }

        let isMatch = bcrypt.compareSync(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Қате құпия сөз! Қайтадан теріңіз!'
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, config.get('jwt_secret_key'), {
            expiresIn: '1h'
        })

        res.json({
            token,
            userId: user.id
        })
        
    } catch(err) {
        res.status(500).json({
            message: 'Кіру кезінде қате орын алды!'
        })
    }
})

module.exports = router