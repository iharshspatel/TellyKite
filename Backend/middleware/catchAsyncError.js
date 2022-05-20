module.exports = (handlerFunc) => (req, res, next) => {
    Promise.resolve(handlerFunc(req, res, next)).catch(next);
}