require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
   name: { type: String, required: true },
   age: Number,
   favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {

   const personDoc = new Person({
      name: 'Bryan', age: 32, favoriteFoods: ['lasagna', 'chicken']
   })

   personDoc.save((err, person) => err
      ? done(err)
      : done(null, person)
   )
};

const createManyPeople = (arrayOfPeople, done) => Person.create(
   arrayOfPeople,
   (err, people) => err
      ? done(err)
      : done(null, people)
)


const findPeopleByName = (personName, done) => Person.find(
   { name: personName },
   (err, person) => err
      ? done(err)
      : done(null, person)
)


const findOneByFood = (food, done) => Person.findOne(
   { favoriteFoods: food },
   (err, person) => err
      ? done(err)
      : done(null, person)
)

const findPersonById = (personId, done) => Person.findById(
   personId,
   (err, person) => err
      ? done(err)
      : done(null, person)
)

const findEditThenSave = (personId, done) => {
   const foodToAdd = "hamburger";

   Person.findById(personId, (err, person) => {

      if (err) return done(err)

      person.favoriteFoods.push(foodToAdd)

      person.save((err, updatedPerson) => err
         ? done(err)
         : done(null, updatedPerson)
      )
   })
};

const findAndUpdate = (personName, done) => {
   const ageToSet = 20;

   Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true },
      (err, updatedPerson) => err
         ? done(err)
         : done(null, updatedPerson)
   )
};

const removeById = (personId, done) => Person.findByIdAndRemove(
   personId,
   (err, deletedPerson) => err
      ? done(err)
      : done(null, deletedPerson)
)


const removeManyPeople = (done) => {
   const nameToRemove = "Mary";

   Person.remove(
      { name: nameToRemove },
      (err, deletedPeople) => err
         ? done(err)
         : done(null, deletedPeople)
   )
};

const queryChain = (done) => {
   const foodToSearch = "burrito"

   Person
      .find({ favoriteFoods: foodToSearch })
      .sort({ name: 'asc' })
      .limit(2)
      .select('-age')
      .exec((err, people) => err
         ? done(err)
         : done(null, people)
      )
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
