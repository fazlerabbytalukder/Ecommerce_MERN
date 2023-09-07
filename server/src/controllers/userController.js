const createError = require('http-errors');
const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const  mongoose = require('mongoose');

// get all user controller 
const getusers = async (req, res, next) => {
    try {
        //setup search and pagination query
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

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

        //go to responsecontroller. here we create success and error response for all functionality an here we send the values.
        return successResponse(res, {
            statusCode: 200,
            message: 'users were returned successfully',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })
    } catch (error) {
        next(error);
    }
};


// get user by id controller 
const getuser = async (req, res, next) => {
    try {
        // find the route id
        const id = req.params.id;

        //for skip to show the user password
        const options = { password: 0 };

        // find by id in User module
        const user = await User.findById(id, options);

        //if no user found send a error
        if (!user) {
            throw createError(404, 'user does not exist with this id');
        }

        //go to responsecontroller. here we create success and error response for all functionality an here we send the values.
        return successResponse(res, {
            statusCode: 200,
            message: 'user were returned successfully',
            payload: {
                user,
            }
        })
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(createError(404, 'Invalid user ID'));
            return;
        }
        next(error);
    }
};

module.exports = { getusers, getuser };