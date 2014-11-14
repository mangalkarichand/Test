var RetailApp = angular.module("RetailApp", [ 'ngRoute', 'ngSanitize', 'ngTouch','ngResource','ngAnimate','RetailApp-application','logger']);
var RetailAppConstants=angular.module('RetailApp-constants', []);
var commonSrv = angular.module('RetailApp-commons', []);
var RetailAppcontrollers = angular.module('RetailApp-controllers', []);
var RetailAppdirectives = angular.module('RetailApp-directives', []);
var RetailAppservices = angular.module('RetailApp-services', []);
var RetailAppfilters = angular.module('RetailApp-filters', []);
var RetailAppGlobal={};
angular.module('RetailApp-application', [ 'RetailApp-commons', 'RetailApp-controllers','RetailApp-directives', 'RetailApp-services',
                                          'RetailApp-constants','RetailApp-filters']);

//setting all urls from the RetailAppGlobal.Routes (config.json)
RetailApp.config(['$routeProvider', function routeProvider($routeProvider) {
	'use strict';
	var views=RetailAppGlobal.Routes;
	for (var viewKey in views) {
		if (views.hasOwnProperty(viewKey)) {
			switch (viewKey) {
			case 'otherwise':
				$routeProvider.otherwise(views[viewKey]);
				break;
			default:
				$routeProvider.when(viewKey, (views[viewKey]).settings);
			break;
			}
		}
	}
}]);

RetailApp.run(['$rootScope','SessionManager','SelectView','loggerService',
               function RetailAppRun($rootScope, SessionManager, SelectView,loggerService) {
	'use strict';

	$rootScope.hideSpinner = false;
	$rootScope.locations = [];
	//$rootScope.loggerQueue = FixedQueue( 100, [ "RetailApp started"] );
	$rootScope.currentView='';
	$rootScope.pageTitle='';
	$rootScope.bodyColour="gray";
	
	var log=loggerService('rootscope');
	// Logout function is available in any pages
	$rootScope.logout = function() {
		//log.log("inside logout");
		SessionManager.clearSession();
		SelectView.gotoLogin();
	};

	$rootScope.logs = function(){
		$('.logs_container').toggleClass('open',500);
	};

	/*$rootScope.clearLogs = function(){
		$rootScope.loggerQueue = FixedQueue( 100, [ "Log cleared"] );
	};


	$rootScope.setlog = function(loggerMsg) {
		if($rootScope.headerVars.LoggerOn)
			$rootScope.loggerQueue.add(loggerMsg);
	};*/

	$rootScope.$on('$routeChangeSuccess', function routeChangeSuccess($event, current) {

		if(current&& current.originalPath&& current.originalPath.length>0 &&
				current.originalPath!==$rootScope.currentView){

			$rootScope.currentView=current.originalPath;
			//log.log("current url",$rootScope.currentView);
			var peripheralArray=[];
			if(RetailAppGlobal.Routes.hasOwnProperty($rootScope.currentView) && (RetailAppGlobal.Routes[$rootScope.currentView]).config){

				var pageConfig=RetailAppGlobal.Routes[$rootScope.currentView].config;

				$rootScope.pageTitle=(pageConfig.header)?pageConfig.header:'';
				$rootScope.bodyColour=(pageConfig.bodyColor)?pageConfig.bodyColor:'gray';
				

				
			} 
			
		}
	});

} ]);



/**  Bootstrapping angular app after loading connfig.json file**/


$(function () {
	'use strict';
	$.ajax({
		url: "scripts/config.json",
		type:"GET",
	}).done(function startup(configData) {

		try{
			var data=angular.fromJson(configData);
			var Config=data.Common;//add all common properties first.
			// Set your constant provider
			if(Config){
				for(var commonkey in Config){
					if(Config.hasOwnProperty(commonkey)){
						RetailAppConstants.value(commonkey, Config[commonkey]);
					}
				}
			}
			if(data.Global){
				Config=data.Global;
				if(Config){
					for(var envkey in Config){
						if(Config.hasOwnProperty(envkey)){
							RetailAppGlobal[envkey]= Config[envkey];
						}
					}
				} 
			}
			var debug=false;
			if(data.Env){
				Config=debug?(data.Env.debug):(data.Env.app);
				if(Config){
					for(var envkey in Config){
						if(Config.hasOwnProperty(envkey)){
							RetailAppConstants.value(envkey, Config[envkey]);
						}
					}
				}
			}
		}
		catch(e){
			throw new Error("[RetailApp-constants] - Configuration not found");
		}


		// Bootstraping angular app
		angular.bootstrap(document, ['RetailApp']);

	});
});



