require('dotenv').config();
const bcrypt = require('bcrypt');

const { client, connection } = require('../');

const validPassword = (suppliedPassword, dbPassword) =>
  bcrypt.compareSync(suppliedPassword, dbPassword);

exports.login = async (email, password) => {
  try {
    await connection;
    const db = client.db(process.env.DBNAME);
    const users = db.collection('users');
    const found = await users.find({ email }).toArray();
    const user = found[0];
    if (!user) {
      throw 'invalid email';
    } else if (!validPassword(password, user.password)) {
      throw 'invalid password';
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
};