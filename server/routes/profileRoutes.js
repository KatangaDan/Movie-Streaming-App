import express from 'express';
import * as profileController from '../controllers/profileController.js'
const router = express.Router();


router.post("/addProfile", profileController.addProfile);

router.get("/getProfiles", profileController.getProfiles);

router.post("/deleteProfile", profileController.deleteProfile);


// ...other routes...

export default router;