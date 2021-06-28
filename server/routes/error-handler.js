const router = require("express").Router();

router.get('/', (err, req, res, next) => {
  console.log(`${err.message}`);
  console.log('ghee')
  res.status(500).json({error: err.message});
})

module.exports = router;