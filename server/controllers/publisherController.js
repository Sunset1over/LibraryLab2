const {Publisher, Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class PublisherController{
    async create(req, res, next) {
        const {name} = req.body
        const existingPublisher = await Publisher.findOne(
            {where: {name}}
        )
        if(existingPublisher){
            return next(ApiError.notFound(`Publisher with name ${name} already exist`))
        }
        const  publisher = await Publisher.create({name})
        return res.json(publisher)
    }

    async getAll(req, res) {
        const publishers = await Publisher.findAll()
        return res.json(publishers)
    }

    async getOne(req, res, next){
        const { id } = req.params;
        const publisher = await Publisher.findByPk(id);
        if (!publisher) {
            return next(ApiError.notFound(`Publisher with id ${id} not found`));
        }
        return res.json(publisher);
    }

    async update(req, res, next) {
        const {id} = req.params
        const {name} = req.body
        const publisher = await Publisher.findByPk(id)
        if (!publisher) {
            return next(ApiError.notFound(`Publisher with id ${id} not found`))
        }
        await publisher.update({name})
        return res.json(publisher)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const publisher = await Publisher.findByPk(id)
        if (!publisher) {
            return next(ApiError.notFound(`Publisher with id ${id} not found`))
        }
        await publisher.destroy()
        return res.json({message: `Publisher with id ${id} was deleted`})
    }
}

module.exports = new PublisherController()