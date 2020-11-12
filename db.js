const Sequelize = require('sequelize')
const {STRING} = Sequelize;
const conn =new Sequelize('postgres://localhost/acme_people_places_things')


const People = conn.define('people', {
    name:{
        type:STRING
    },
})
const Places = conn.define('places', {
    city:{
        type:STRING
    },
})
const Things = conn.define('things', {
    item:{
        type:STRING
    },

})
const Purchase = conn.define('purchase', {
    purchaseid:{
        type:STRING
    },
    
   
})
Purchase.belongsTo(People);
Purchase.belongsTo(Places);
Purchase.belongsTo(Things);


const syncAndSeed = async() => {
    await conn.sync({force: true});
    const [lucy, moe, larry]= await Promise.all(
    ['lucy','moe','larry'].map( name => People.create({name})))

    const [NYC, Chicago, LA]= await Promise.all(
        ['NYC', 'Chicago', 'LA'].map( city => Places.create({city})))

    const [foo, barr, bazz]= await Promise.all(
        ['foo', 'barr', 'bazz'].map( item => Things.create({item})))

}

module.exports ={
    syncAndSeed
}