/* 
Rutas de Usuario /Auth
host + /api/auth
*/

const {Router} =require('express')
const {check} =require('express-validator')
const router = Router();
const {validateFields} =require('../middlewares/field-validate')

const {createUser, userLogin, revalidateToken} =require('../controllers/auth')

const {validateJWT} =require('../middlewares/validate-jwt');

router.post('/new',
[
    check('name','The name is an obligatory field').not().isEmpty(),
    check('email','please provide a valid email').isEmail(),
    check('password','password not valid min length is 6').isLength({min:6}),
    validateFields
],
createUser
);
router.post('/',
[
    check('email','please provide a valid email').isEmail(),
    check('password','password not valid min length is 6').isLength({min:6}),
    validateFields
], 
userLogin
);
router.get('/renew',validateJWT, revalidateToken);


module.exports= router;