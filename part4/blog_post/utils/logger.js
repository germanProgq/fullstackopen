const info = (...params) => {
    console.log(...params);
};

const warning = (...params) => {
    console.warn(...params);
};

const error = (...params) => {
    console.error(...params);
};

module.exports = {info, error, warning};