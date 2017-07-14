/**
 * Created by michal.svancar on 26.04.2017.
 */

// Create a connection with mysql database abd create table schema with dummy data everytime server starts

var Sequelize = require('sequelize');
var Faker = require('faker');
var Lodash = require('lodash');

const Conn = new Sequelize(
    'DB_Schema',
    'login',
    'Password',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
    }
);

const Author = Conn.define('author', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});

// Do not change define String name, it will create 2 Tables and one is empty
const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Relations
Author.hasMany(Post);
Post.belongsTo(Author);

// Force makes sure there is always only 20 people in database and wont add new inserts.

Conn.sync({force: true}).then(()=> {
    Lodash.times(10, () => {
        return Author.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
        }).then(author => {
            // createPost() is dynamically by sequelize created method for SQL (create + constdefineName)
            return author.createPost({
                title: `Sample title by ${author.firstName}`,
                content: `This content is written somewhere else. For more info go visit ${author.email}`
            })
        })
    })
});

module.exports = Conn;