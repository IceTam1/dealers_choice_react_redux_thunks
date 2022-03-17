const { syncAndSeed, Plant, Plantthing } = require('./db');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.json())



app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/plants', async (req,res,next) => {
  try {
    res.send(await Plant.findAll())   
  }
  catch (ex) {
    next(ex)  
  }
})

app.post('/api/plants', async (req,res,next) => {
  try {
    res.status(201).send(await Plant.generateRandom())    
  }
  catch (ex) {
    next(ex)  
  }
})

app.get('/api/plantthings', async (req,res,next) => {
  try {
    res.send(await Plantthing.findAll())    
  }
  catch (ex) {
    next(ex)  
  }
})

app.delete('/api/plants/:id', async(req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    await plant.destroy();
    res.sendStatus(204)
  }
  catch (ex){
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
