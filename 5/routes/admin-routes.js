const express = require("express");
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const router = express.Router();

router.get("/welcome",authMiddleware,adminMiddleware, (req, res) => {
  res.json({
    msg: "Welcome to the admin page",
  });
});

module.exports = router;
