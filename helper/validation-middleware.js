const validator = require("./validate");

const validate = (req, res, next) => {
    const validationRule = {
        "hiveFleet": "required|string",
        "adaptive": "required|string",
        // "nullForceOrg": "object",
        // "hq": "required|object",
        // "troop": "object",
        // "elite": "oject",
        // "fastAttack": "object",
        // "heavySupport": "object",
        // "flyer": "object",
        // "transport": "object"
    };

    validator(req.body, validationRule, {}, (err, status) => {
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
    })
}

module.exports = {
    validate
};