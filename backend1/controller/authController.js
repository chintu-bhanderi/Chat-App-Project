const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel');


module.exports.userRegister = (req, res) => {
     console.log('register is working');

     const form = formidable();
     form.parse(req, async (err, fields, files) => {

          const {
               userName, email, password,confirmPassword
          } = fields;

          const {image} = files;
          const error = [];

          if(!userName){
               error.push('Please provide your user name');
          }
          if(!email){
               error.push('Please provide your Email');
          }
          if(email && !validator.isEmail(email)){
               error.push('Please provide your Valid Email');
          }
          if(!password){
               error.push('Please provide your Password');
          }
          if(!confirmPassword){
               error.push('Please provide your confirm Password');
          }
          if(password && confirmPassword && password !== confirmPassword){
               error.push('Your Password and Confirm Password not same');
          }
          if(password && password.length < 6){
               error.push('Please provide password mush be 6 charecter');
          }
          if(Object.keys(files).length === 0){
               error.push('Please provide user image');
          }
          if(error.length > 0){
               res.status(400).json({
                    error:{
                         errorMessage : error
                    }
               })
          } else {
               const getImageName = files.image.originalFilename;
               const randNumber = Math.floor(Math.random() * 99999);
               const newImageName = randNumber + getImageName;
               files.image.originalFilename = newImageName;
               const newPath = __dirname + `../../../frontend1/public/image/${files.image.originalFilename}`;

               try{
                    const checkUser = await registerModel.find({email});
                    if(checkUser) {
                         res.status(400).json({
                              error: {
                                   errorMessage: ['This email is already existed']
                              }
                         })
                    }

               } catch(err) {
                    res.status(500).json({
                         error: {
                              errorMessage: ['Internal Server Error']
                         }
                    })
               }

          }


     }) // end Formidable  
}