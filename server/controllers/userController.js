const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.notFound('Incorrectly entered data'))
        }
        const existingUser = await User.findOne(
            {
                where: {email}
            }
        )
        if(existingUser) {
            return next(ApiError.notFound(`User with email ${email} already exist`))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const  {email, password} = req.body
        const user = await User.findOne(
            {
                where: {email}
            }
        )
        if(!user) {
            return next(ApiError.notFound(`User with email ${email} not exist`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.notFound('Password mismatch'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.notFound(`User with id ${id} not found`));
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = await bcrypt.hash(password, 5);
            }
            await user.save();
            return res.json({ message: "User data updated successfully" });
        } catch (err) {
            return next(ApiError.forbidden(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.notFound(`User with id ${id} not found`));
            }
            await user.destroy();
            return res.json({ message: "User deleted successfully" });
        } catch (err) {
            return next(ApiError.forbidden(err.message));
        }
    }
}

module.exports = new UserController()