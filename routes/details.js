const express = require('express')
const router = express.Router()

const { getAllDetails, getDetail, updateDetail, deleteDetail, createDetail, } = require('../controllers/details')

router.route('/').get(getAllDetails).post(createDetail)
router.route('/student=:id').get(getDetail).patch(updateDetail).delete(deleteDetail)

module.exports = router