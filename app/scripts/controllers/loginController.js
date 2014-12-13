
RetailAppcontrollers.controller('RetailApp-loginCntrl',function loginController ( $scope, $rootScope, AppConstants,SelectView,SessionManager, $location,loggerService ) {
	"use strict";

	var log = loggerService('RetailApp-loginCntrl');
	log.log("Inside RetailApp-loginCntrl");

	$scope.username='';
	$scope.password='';

	$scope.signIn=function(){
		console.log("USERANME :"+$scope.username +'PASSWORD:'+$scope.password);
		SelectView.gotoView('checkout');

	}

	$scope.cancel=function(){
		$scope.username='';
		$scope.password='';

	}


});

