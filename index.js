import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 3003;


app.use('/', express.static('./'));
const initServer = async () => {

  app.post('/',(req, res) => {
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
      dest.on('finish', () => {
          console.log('Finish:')
      })
      
      


    })
  ).then(x => console.log(x));
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  }


  app.get('/', function (req, res) {
  
    
  res.header("Content-Type", "application/text");
  fs.readFile('./tmp.txt', (err, data) => {
      if (err) throw err;
      
      res.status(200).send(data);
  });

  
  

})


initServer().catch(err => {
    console.log(err);
  })
