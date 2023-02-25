const validator = require("./validate");

const validate = (req, res, next) => {
    const validationRule = {
        "hiveFleet": "required|string",
        "adaptive": "required|string",
        "hq": "required"
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