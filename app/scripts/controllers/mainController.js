document.addEventListener('touchmove', function(e){
	"use strict";
	e.preventDefault();
});

RetailAppcontrollers.controller('RetailApp-mainCntrl',function mainController ( $scope, $rootScope, AppConstants,SelectView,SessionManager, $location,loggerService ) {
	"use strict";

	var log = loggerService('RetailApp-cartCntrl');

	log.log("Inside RetailApp-mainCntrl");




});

