const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const {name} = req.body
        const existingType = await Type.findOne(
            {where: {name}}
        )
        if(existingType){
            return next(ApiError.notFound(`Type with name ${name} already exist`))
        }
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOne(req, res, next){
        const { id } = req.params;
        const type = await Type.findByPk(id);
        if (!type) {
            return next(ApiError.notFound(`Type with id ${id} not found`));
        }
        return res.json(type);
    }

    async update(req, res, next) {
        const {id} = req.params
        const {name} = req.body
        const type = await Type.findByPk(id)
        if (!type) {
            return next(ApiError.notFound(`Type with id ${id} not found`))
        }
        await type.update({name})
        return res.json(type)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const type = await Type.findByPk(id)
        if (!type) {
            return next(ApiError.notFound(`Type with id ${id} not found`))
        }
        await type.destroy()
        return res.json({message: `Type with id ${id} was deleted`})
    }
}

module.exports = new TypeController()