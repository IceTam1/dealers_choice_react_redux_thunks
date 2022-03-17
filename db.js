const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux')
const faker = require("faker")

const Plant = sequelize.define('plant', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
   sunlight: {
       type: Sequelize.STRING
   }
})

const Plantthing = sequelize.define('plantthing', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
       type: Sequelize.TEXT 
    }
})

// Plant.belongsTo(Plantstore)
// Plantstore.hasMany(Plant)

Plant.generateRandom = function () {
    return this.create({ name: `${faker.animal.type()} Plant` })
}


const syncAndSeed = async () => {
  await sequelize.sync({ force: true })
  await Plant.create({ name: 'Pothos Plant', sunlight: 'Indirect, Bright Sunlight'})   
  await Plant.create({ name: 'Snake Plant', sunlight: 'Indirect, Bright Sunlight'}) 
  await Plant.create({ name: 'Monstera Plant', sunlight: 'Medium, Bright Sunlight'}) 
  
  await Plantthing.create({ name: 'Dahing Plants', address: '289 Grand St, New York, NY 10002'})   
  await Plantthing.create({ name: 'The Sill', address: '84 Hester St, New York, NY 10002'}) 
  await Plantthing.create({ name: 'Jungle NYC', address: '145 Wythe Ave, Brooklyn, NY 11249'})

}

module.exports = {
    Plant,
    Plantthing,
    syncAndSeed
}