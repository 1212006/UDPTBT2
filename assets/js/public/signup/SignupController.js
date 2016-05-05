angular.module('SignupModule').controller('SignupController', ['$scope','$http', 'toastr',function($scope,$http, toastr){
	
	//set-up loading state 
	$scope.signupForm ={
		loading:false
	}

	$scope.submitSignupForm = function(){

		$scope.signupForm.loading = true;
		
		$http.post('/signup',{

			name: $scope.signupForm.name,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password

		})
		.then(function onSuccess(){
			window.location = '/user';
			console.log(sailsResponse);
		})
		.catch(function onError(sailsResponse){

			//bat loi trung email
			
			var emailAddressAlreadyInUse = sailsResponse.status == 409;
			if(emailAddressAlreadyInUse){
				toastr.error('That email has been used, pls try again.', 'error');
				$scope.signupForm.loading = false;
				return;
			}
		})
		.finally(function eitherWay(){
			$scope.signupForm.location = false;
		})
	}
}]);
