const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info("Method: ", req.method);
    logger.info("Path: ", req.path);
    logger.info("Body: ", req.body);
    logger.info('----');

    next();
};

const unknownPathHandler = (req, res) => {
    res.status(404).send({ error: 'Unknown path' });
}

const errorHandler = (error, req, res, next) => {
    logger.error(error);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformed id '});
    } 
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: 'Verification failed' });
    };

    next(error);
};

module.exports = { requestLogger, unknownPathHandler, errorHandler };