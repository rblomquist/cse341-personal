const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");

router.get('/', (req, res) => {
    res.send('Home Page');
  });

router.use("/tyranids", tyranids);
router.use("/wolves", wolves);

module.exports = router;