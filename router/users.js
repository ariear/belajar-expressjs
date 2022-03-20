const express = require('express')
const router = express.Router()

const usercontroller = require('../controllers/users')  // untuk memanggil controller

router.route('/users')
    .get(usercontroller.index)  // cara pemganggilan controller
    .post(usercontroller.post)

router.get('/users/create', usercontroller.create)

router.get('/users/:id', usercontroller.detail)

router.get('/users/:id/edit', usercontroller.edit)
router.post('/users/:id/edit', usercontroller.put)

router.post('/users/delete/:id', usercontroller.delete)

module.exports = router