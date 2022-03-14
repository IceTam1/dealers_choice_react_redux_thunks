const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux')

const Plant = sequelize.define('plant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
   sunlight: {
       type: Sequelize.STRING
   }
})

const Plantstore = sequelize.define('plantstore', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Plant.belongsTo(Plantstore)
Plantstore.hasMany(Plant)


const syncAndSeed = async () => {
  await sequelize.sync({ force: true })
  await Plant.create({ name: 'Pothos Plant', sunlight: 'Indirect, Bright Sunlight'})   
  await Plant.create({ name: 'Snake Plant', sunlight: 'Indirect, Bright Sunlight'}) 
  await Plant.create({ name: 'Monstera Plant', sunlight: 'Medium, Bright Sunlight'}) 


}

module.exports = {
    Plant,
    Plantstore,
    syncAndSeed
}