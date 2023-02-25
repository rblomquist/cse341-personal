const validator = require("./validate");

const validate = async (req, res, next) => {
    const validationRule = {
        "hiveFleet": "required|string",
        "adaptive": "required|string",
        "nullForceOrg": "string",
        "hq": "required|string",
        "troop": "string",
        "elite": "string",
        "fastAttack": "string",
        "heavySupport": "string",
        "flyer": "string",
        "transport": "string"
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