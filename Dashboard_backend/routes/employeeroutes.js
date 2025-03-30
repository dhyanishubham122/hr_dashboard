const express=require('express');
const router= express.Router();
const upload=require('../utils/multer.js');
const {candidate_to_employee,deleteEmployee,allemployees,
    updateemployess,employeefilter}=require('../controllers/employessController.js');
 router.post('/candidatetoemployee/:id',candidate_to_employee);
 router.delete('/delete/:id',deleteEmployee);   
 router.get('/allemployess',allemployees);
 router.get('/searchemployee',employeefilter);
 router.patch('/updateemployee/:id',upload.single("profile"),updateemployess);
 
 module.exports=router;