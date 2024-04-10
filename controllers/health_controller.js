const health_check = (req, res) => {
    return res.json(
        {
            "env": process.env.APP_ENV
        }
    )
}

module.exports = {
    health_check
}