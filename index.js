import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 3003;

let ary=[];
app.use('/', express.static('./'));
const initServer = async () => {

  app.post('/',(req, res) => {
    console.log(req.body);
    res.end('ok');
  });
  
  //32933261 k-league -FC seoul vs Gangwon
  //32718383 Concacaf champoin- Pumas vs cruz
  //32679943 Premier league - Burnley vs Everton
  
  //https://api.sportradar.com/soccer-extended/trial/v4/en/schedules/live/timelines.json?api_key=cqw2qftzedx2ch2cdwwgj4p5  32933123
  
  setInterval(function () {
    fetch("https://api.sportradar.com/soccer-extended/trial/v4/en/schedules/live/timelines.json?api_key=vpqwepdexzqwxvqsjzpsf3cv")
    .then(function(res) {
      return res.json();
    })
    .then(
    res =>
      new Promise((resolve, reject) => {
        
        console.log(res)
        
        for(var i=0;i<res.sport_event_timelines.length;i++){
          if(res.sport_event_timelines[i].id.includes("30903601")){
            for(var k=0;k<res.sport_event_timelines[i].timeline.length;k++){
              if(ary.length>0){
                for(var l=0;l<ary.length;l++){
                
                  if(res.sport_event_timelines[i].timeline[k].id==ary[l].id){
                    ary.splice(l, 1);;
                  }
                  
                  
                }
                
              }
              ary.push(res.sport_event_timelines[i].timeline[k]);
            }
          }
        }
        fs.outputFile('./data.json',JSON.stringify(ary) , (err) => {
            if (err) throw err;

            resolve("it worked")
        });

      })
    )
  
  
  }, 5000);
  
  
  
  
  
 


    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  }
  

  app.get('/', function (req, res) {
  
    
  res.header("Content-Type", "application/json");
  fs.readFile('./data.json', (err, data) => {
      if (err) throw err;
     

      let jsn=JSON.parse(data);
      
        
      res.status(200).send(jsn);
  });

  
  

})


initServer().catch(err => {
    console.log(err);
  })
