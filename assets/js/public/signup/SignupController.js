angular.module('SignupModule').controller('SignupController', ['$scope','$http',function($scope,$http){
	
	//set-up loading state 
	$scope.signupForm ={
		loading:false
	}

	$scope.submitSignupForm = function(){

		$scope.signupForm.loading = true;
		
		$http.post('/signup',{

			name: $scope.signupForm.name,
			title: $scope.signupForm.title,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password

		})
		.then(function onSuccess(){
			window.location = '/user';
		})
		.catch(function onError(sailsResponse){
			console.log(sailsResponse);
		})
		.finally(function eitherWay(){
			$scope.signupForm.location = false;
		})
	}
}]);
