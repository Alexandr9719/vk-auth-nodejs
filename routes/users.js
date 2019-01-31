import express from 'express';
import axios from 'axios';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  axios.get(`https://api.vk.com/method/friends.get?user_ids=${req.cookies.vk_user_id}&order=random&count=5&offset=1&fields=photo_200_orig,city&name_case=nom&access_token=${req.cookies.vk_access_token}&v=5.92`)
    .then(response => { 
      console.log(response.data.items);
      res.send(response.data); 
    })
    .catch(error => {
      res.send(error);
    });
});

export default router;
