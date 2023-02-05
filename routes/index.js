const router = require("express").Router();
const tyranids = require("./tyranids");

router.get('/', (req, res) => {
    res.send('Home Page');
  });

router.use("/tyranids", tyranids);

module.exports = router;