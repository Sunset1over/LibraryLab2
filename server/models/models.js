const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    language: {type: DataTypes.STRING, allowsNull: false},
    origin_language: {type: DataTypes.STRING, allowsNull: false},
    cover: {type: DataTypes.STRING, allowsNull: true},
    pages: {type: DataTypes.INTEGER, allowsNull: false},
    translator: {type: DataTypes.STRING, allowsNull: true},
    year_of_publishing: {type: DataTypes.INTEGER, allowsNull: true},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Publisher = sequelize.define('publisher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasMany(Rating)
Rating.belongsTo(User)

Type.hasMany(Book)
Book.belongsTo(Type)

Publisher.hasMany(Book)
Book.belongsTo(Publisher)

Book.hasMany(Rating)
Rating.belongsTo(Book)

module.exports = {
    User,
    Book,
    Type,
    Publisher,
    Rating
}