const notfoundmiddleware = (req, res, next) => {
    try {
        res.status(404).json('Route not found');
    } catch (error) {
        res.status(500).json(error);
    }
};
export default notfoundmiddleware