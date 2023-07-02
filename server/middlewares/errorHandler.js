const errorHandler = async(error, req, res, next) => {
    let status = 500;
    let message = 'Internal server error'
    let name = error.name

    switch(name) {
        
    }


    res.status(status).json({message})
}

module.exports = errorHandler