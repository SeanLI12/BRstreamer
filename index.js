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
  
  //32933261 k-league -FC seoul vs Gangwon
  //32718383 Concacaf champoin- Pumas vs cruz
  //32679943 Premier league - Burnley vs Everton
  
  fetch("https://api.sportradar.com/soccer-extended/trial/v4/stream/events/subscribe?api_key=uxntnnupmr3228nuxswaa77x&amp;format=json&amp;sport_event_id=sr:sport_event_id:32679943")
  .then(
  res =>
    new Promise((resolve, reject) => {
      const dest = fs.createWriteStream("./tmpfe.txt");
      
      res.body.pipe(dest);
      
      
      res.body.on("end", () => resolve("it worked"));

      dest.on("error", reject);
      
      
      


    })
  )
  fs.readFile('./testdata.txt', (err, data) => {
      if (err) throw err;
      let st=data.toString();
     let ste= st.replace(/\s+/g, '');
     let eww=ste.replace(/(\r\n|\n|\r)/gm, "");
     let eee=eww.replace(/\}\}\{/g, "}},{");
     let ary="["+eee+"]";

     let jsn=JSON.parse(ary);
     
      console.log(jsn);

  });


    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  }
  function replaceAll(str, find, replace) {
      var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  app.get('/', function (req, res) {
  
    
  res.header("Content-Type", "application/json");
  fs.readFile('./tmpfe.txt', (err, data) => {
      if (err) throw err;
      let st=data.toString();
      let ste= st.replace(/\s+/g, '');
      let eww=ste.replace(/(\r\n|\n|\r)/gm, "");
      let eee=eww.replace(/\}\}\{/g, "}},{");
      let ary="["+eee+"]";

      let jsn=JSON.parse(ary);
      
        
      res.status(200).send(jsn);
  });

  
  

})


initServer().catch(err => {
    console.log(err);
  })
