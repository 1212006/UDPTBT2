/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * Sign up for a user account.
   */
   signup: function(req,res){

	   var Passwords = require('machinepack-passwords');

		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
		password: req.param('password'),
		}).exec({
		// An unexpected error occurred.
		error: function (err){
			return res.negotiate(err);
		},
		// OK.
		success: function (encryptedPassword){
	   		
			//Create a User with the param sent from the signup form
			User.create({
				name: req.param('name'),
				email: req.param('email'),
				encryptedPassword: encryptedPassword
			}, function userCreated(err, newUser){
				if(err){
					console.log("err: ",err);
					console.log("err.invalidAttributes: ", err.invalidAttributes);

					//mail da su dung
	              	if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
	                && err.invalidAttributes.email[0].rule === 'unique') {
	                return res.emailAddressInUse();
					}
					//
					return res.negotiate(err);
				}
				return res.json({
					id: newUser.id
				});
   			
	   		});
		}
	});
	}
};