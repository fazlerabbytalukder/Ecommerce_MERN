const createError = require('http-errors');
const User = require("../models/userModel");

const getusers = async (req, res, next) => {
    try {
        //setup search and pagination query
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;

        //search regular expression
        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        
        //set filter isAdmin not show and search by name,email,phone
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                {name:{$regex:searchRegExp}},
                {email:{$regex:searchRegExp}},
                {phone:{$regex:searchRegExp}},
            ]
        }

        //for skip to show the user password
        const options = { password: 0 };

        //find user and search pagination applied
        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit); //asume 10 user 2 page go-> (2-1)*5=5 skip 5 user.
        
        //total number of user find with filter and without filter for know the number of user
        const count = await User.find(filter).countDocuments();

        //if no user found show an error message
        if (!users) throw createError(404, 'No user found');


        res.status(200).send({
            message: 'users were returned',
            users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = { getusers };