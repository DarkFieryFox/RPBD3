import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


import '/imports/api/progresss'
import '/imports/api/schoolchilds'
import '/imports/api/parent'


const SEED_USERNAME = 'Kristina';
const SEED_PASSWORD = '1';


Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    console.log("Create User")
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

});

