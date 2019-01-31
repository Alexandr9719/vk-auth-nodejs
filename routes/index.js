import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.cookies);
  
  res.render('index', { title: 'Express' });
});
router.get('/login', (req, res, next) => {
  res.redirect(`https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=popup&redirect_uri=http://localhost:3000/auth&scope=friends&response_type=code&v=5.92`);
});
router.get('/auth', (req, res, next) => {
  axios.get(`https://oauth.vk.com/access_token?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_CLIENT_SECRET}&redirect_uri=http://localhost:3000/auth&code=${req.query.code}`)
    .then(response => { 
      if (response.data.error) {
        res.send(404);
      }
      res.cookie('vk_access_token', response.data.access_token, { expires: new Date(Date.now() + parseInt(response.data.expires_in)) });
      res.cookie('vk_user_id', response.data.user_id, { expires: new Date(Date.now() + parseInt(response.data.expires_in)) });
      res.redirect('/');
    })
    .catch(error => { res.send(error); });
});

export default router;