exports.createPostValidators = (req,res,next) => {
    
    //Title
    req.check('title','write title').notEmpty();
    req.check('title','title must be between 4 - 150 char').isLength({
        min:4,
        max:150
    });
    //body
    req.check('body','write body').notEmpty();
    req.check('body','body must be between 4 - 2000 char').isLength({
        min:4,
        max:2000
    });
    const errors = req.validationErrors()

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error : firstError})
    }
    next();
};

exports.userSignupValidator=(req,res,next)=>{
    req.check('name', 'name Required').notEmpty()

    req.check('email',"email must be between 3 to 32 char")
    .matches(/.+\@.+\..+/)
    .withMessage('email must contain @')
    .isLength({
        min:4,
        max:2000
    })

    req.check('password','password required').notEmpty();
    req.check('password').isLength({min:6})
    .withMessage('password must conatin 6 chars')
    .matches(/\d/)
    .withMessage('password must contains no')

    const errors = req.validationErrors()

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error : firstError})
    }
    next();
}