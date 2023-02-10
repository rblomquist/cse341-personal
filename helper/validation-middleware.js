const validator = require("./validate");

const validate = async (req, res, next) => {
    const validationRule = {
        "hiveFleet": "required|string",
        "adaptive": "required|string",
        "nullForceOrg": "string",
        "hq": "string",
        "troop": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    validate
};