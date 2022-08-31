const notFound = (req,res) => res.status(404).send('Route does not exist, check request and try again')

module.exports = notFound