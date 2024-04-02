import express from "express"
import { allUser , userById , createuser , updateUser , deleteUser} from "../controllers/userController.js"
const router = express.Router();

router.get('/' , allUser);
router.get('/:id' , userById);
router.post('/' , createuser);
router.put('/:id' , updateUser);
router.delete('/:id' , deleteUser);



export default router ;