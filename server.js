const { syncAndSeed, Plant, Store } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/plants', async (req,res,next) => {
  try {
    res.send(await Plant.findAll())    
  }
  catch (ex) {
    next(ex)  
  }
})

const start = async () => {
    try {
      await syncAndSeed()
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));

    }
    catch (ex) {
        console.log(ex)
    }
}

start()
