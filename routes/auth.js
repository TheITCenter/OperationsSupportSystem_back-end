/* 
Rutas de Usuario /Auth
host + /api/auth
*/

const {Router} =require('express')
const {check} =require('express-validator')
const router = Router();
const {validateFields} =require('../middlewares/field-validate')

const {createUser, modifyUser, userLogin, revalidateToken, findUser, deleteUser} =require('../controllers/auth')

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
router.patch('/update/:id',validateJWT, modifyUser);
router.delete('/delete/:id',validateJWT, deleteUser)
router.get('/:id',validateJWT, findUser)
router.get('/renew',validateJWT, revalidateToken);


module.exports= router;