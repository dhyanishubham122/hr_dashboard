const express=require('express');
const router= express.Router();
const upload=require('../utils/multer.js');
const {addCandidate,deleteCandidate,updateCandidate,
       candidateResume,candidateFilter,allcandidate}=require('../controllers/candidateController.js');

router.post('/add',upload.single("resume"),addCandidate);
router.delete('/delete/:id',deleteCandidate);
router.patch('/update/:id',updateCandidate);
router.get('/getresume',candidateResume);
router.get('/searchfilter',candidateFilter);
router.get('/allcandidate',allcandidate);
module.exports=router;