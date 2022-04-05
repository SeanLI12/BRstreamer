import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3003;
const router = express.Router();

app.use("/", router);

const initServer = async () => {

  router.post('/',(req, res) => {
    console.log(req.body);
    res.end('ok');
  });
  countStream.on('total',(count)=>{
    console.log(count)
  })
  router.get('/',(req, res) => {
    console.log(req.body);
    res.pipe(countStream);
    res.end('ok');
  });
  const response = await fetch('https://api.sportradar.com/soccer-extended/trial/v4/stream/events/subscribe?api_key=uxntnnupmr3228nuxswaa77x&amp;format=json&amp;sport_event_id=sr:sport_event_id:5840253', {method: 'GET'});
  
  response.pipe(countStream);


  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
 
  
  

}





initServer().catch(err => {
    console.log(err);
  })
