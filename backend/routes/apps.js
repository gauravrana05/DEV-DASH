const express = require('express')

const router = express.Router()
const {
  createApp,
  deleteApp,
  getAllApps,
  updateApp,
  getApp,
} = require('../controllers/apps')

router.route('/').post(createApp).get(getAllApps)

router.route('/:id').get(getApp).delete(deleteApp).patch(updateApp)

module.exports = router
