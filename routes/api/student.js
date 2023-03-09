const express = require('express');
const router = express.Router();
const stuServ = require('../../services/studentService');
const { asyncHandler } = require('../getSendResult')

router.get('/', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sex = req.query.sex || -1;
  const name = req.query.name || '';
  return await stuServ.getStudents(page, limit, sex, name);
}))


module.exports = router;