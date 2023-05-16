const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const {Book, BookInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class BookController{
    async create(req, res, next) {
        try {
            let {name, language, origin_language, cover, pages, translator, year_of_publishing, publisherId, typeId} = req.body
            const img = req.files && req.files.img

            const existingBook = await Book.findOne(
                {
                    where: { name }
                }
            );
            if (existingBook) {
                return next(ApiError.notFound(`Book with name ${name} already exist`));
            }

            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await Book.create({name, language, origin_language, cover, pages, translator, year_of_publishing, publisherId, typeId, img: fileName})


            return res.json(book)
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async getAll(req, res) {
        let {publisherId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let books;
        if(!publisherId && !typeId){
            books = await Book.findAndCountAll({limit, offset})
        }
        if(publisherId && !typeId){
            books = await Book.findAndCountAll(
                {
                    where: {publisherId},
                    limit,
                    offset
                }
            )
        }
        if(!publisherId && typeId){
            books = await Book.findAndCountAll(
                {
                    where: {typeId},
                    limit,
                    offset
                }
            )
        }
        if(publisherId && typeId){
            books = await Book.findAndCountAll(
                {
                    where: {publisherId, typeId},
                    limit,
                    offset
                }
            )
        }
        return res.json(books)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const existingBook = await Book.findOne(
            {
                where: {id}
            },
        )
        if (!existingBook) {
            return next(ApiError.notFound(`Book with id ${id} not found`));
        }
        return res.json(existingBook)
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, language, origin_language, cover, pages, translator, year_of_publishing, rating, publisherId, typeId } = req.body;
            const img = req.files && req.files.img;

            const book = await Book.findByPk(id);
            if (!book) {
                return next(ApiError.notFound(`Book with id ${id} not found`));
            }

            if (img) {
                const oldImgPath = path.resolve(__dirname, '..', 'static', book.img);
                if (fs.existsSync(oldImgPath)) {
                    fs.unlinkSync(oldImgPath);
                }
            }

            let fileName;
            if (img) {
                fileName = uuid.v4() + '.jpg';
                await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }

            book.name = name;
            book.language = language;
            book.origin_language = origin_language;
            book.cover = cover;
            book.pages = pages < 0 ? null : pages;
            book.translator = translator;
            book.year_of_publishing = (year_of_publishing < 0 || year_of_publishing > new Date().getFullYear()) ? null : year_of_publishing;
            book.rating = rating;
            book.publisherId = publisherId;
            book.typeId = typeId;
            if (fileName) {
                book.img = fileName;
            }

            await book.save();

            return res.json({ message: `Book ${id} updated` });
        } catch (e) {
            next(ApiError.notFound(e.message));
        }
    }


    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const book = await Book.findByPk(id);
            if (!book) {
                return next(ApiError.notFound(`Book with id ${id} not found`));
            }

            const imgPath = path.resolve(__dirname, '..', 'static', book.img);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }

            await book.destroy();

            return res.json({ message: `Book ${id} deleted`});
        } catch (e) {
            next(ApiError.notFound(e.message));
        }
    }
}

module.exports = new BookController()