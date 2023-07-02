const errorHandler = async(error, req, res, next) => {
    let status = 500;
    let message = 'Internal server error'
    let name = error.name

    switch(name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            status = 400;
            message = error.errors[0].message;
            break;
        case 'InvalidEmailPassowrd':
        case 'AlreadyExist':
            status = 400;
            message = error.message
            break;
        case 'JsonWebTokenError':
            status = 401;
            message = 'Invalid Token';
            break;
        case 'InvalidToken':
            status = 401;
            message = error.message;
            break;
        case 'notFound':
            status = 404;
            message = error.message
    }


    res.status(status).json({message})
}

module.exports = errorHandler

// 'SequelizeUniqueConstraintError'
// 'SequelizeValidationError'
// 'JsonWebTokenError'
// 'SequelizeForeignKeyConstraintError'