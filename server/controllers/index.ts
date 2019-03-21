import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  res.render('index', {
    env: {
      ENV: process.env.ENV || 'production'
    }
  });
});

module.exports = router;
