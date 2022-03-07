import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3003;
const router = express.Router();
app.use("/", router);

const initServer = async () => {


  

  const response = await fetch('https://api.sportradar.com/soccer-extended/trial/v4/stream/events/subscribe?api_key=uxntnnupmr3228nuxswaa77x&format=json&sport_event_id=sr:sport_event_id:32382675', {method: 'GET'});
  const data = await response.json();
  console.log(data);
  router.post('/',(req, res) => {
    console.log(req.body);
    res.end('ok');
  });

  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
 
  
  

}





initServer().catch(err => {
    console.log(err);
  })
