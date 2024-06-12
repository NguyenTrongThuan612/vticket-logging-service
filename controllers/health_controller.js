const health_check = (req, res) => {
    return res.status(200).json(
        {
            "env": process.env.APP_ENV
        }
    )
}

module.exports = {
    health_check
}