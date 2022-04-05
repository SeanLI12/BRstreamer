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
  
  
  
  fetch("https://api.sportradar.com/soccer-extended/trial/v4/stream/events/subscribe?api_key=uxntnnupmr3228nuxswaa77x&amp;format=json&amp;sport_event_id=sr:sport_event_id:5840253")
  .then(
  res =>
    new Promise((resolve, reject) => {
      const dest = fs.createWriteStream("./tmp.txt");
      res.body.pipe(dest);
      res.body.on("end", () => resolve("it worked"));
      dest.on("error", reject);
    })
)
.then(x => console.log(x));
  response.pipe(count);


  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
 
  
  

}





initServer().catch(err => {
    console.log(err);
  })
