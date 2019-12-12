var app = angular.module('QuerySearch', ['ngRoute','angularUtils.directives.dirPagination']); 
app.config(function $routeProvider){

$routeProvider
.when("/", { templateUrl : "index.html" ,
})
.when("/results.html" ,{
   templateUrl : "results.html",
   controller : "searchController" 
    });
 });
 
app.service('productService',function($window){
var productList = [];
var addProduct = function(newObj){
productList.push(newObj);
  };

var getProducts = function(){
return productList;
}; 

var delProducts = function(){
productList=[];
}; 
 return {
	 addProduct: addProduct,
	 getProducts: getProducts
 };

});

app.controller("mainController", function($scope,$location){
	
	$scope.clicked = function()( 
	// productService.addProduct();
	//$location.path("/results"+$scope.name)
	window.sessionStorage.setItem("searchRes",$scope.name ); 
	window.location = "results.html"; 
  }
}) ; 
app.controller("searchController", function($scope,$routeParams,$http) {
	$scope.products = window.sessionStorage.getltem("searchRes"); 
	$scope.search = $scope.products; $scope.showLoader = true; 
	
  $scope.dataLoaded = []; 
  $scope.pageno = 1; 
  $scope.total_count = 0; 
  $scope.itemsPexPage = 10; 

$scope.like = function(valueId){ console.log(valueId); }

$scope.disLike = function(valueId){ console.log(valueId);}
 
$scope.clicked = function(){ 
// productService.addProduct(); 
//$1ocation.path(m/resultsm+$scope.name) 
 $http({ 
 method: 'GET', url: 'sample.json' 
 }).then(function (response){ 
  console.log(response, 'res'); 
  $scope.dataLoaded = response.data.data;
  $scope.total_count = $scope.dataLoaded.length; 
  $scope.showLoader = false; 
  },function (error){ 
  $scope.showLoader = false;
  });
}
  
$http({ 
method: 'GET',
 url: 'http://localhost:7668/sammle/qztable' 
 }).then(function (response){
	 console.log(response, 'res');
	 $scope.dataLoaded = response.data[0].data;
	 $scope.total_count = $scope.dataLoaded.length; 
	 $scope.showLoader = false; 
	 },function (error){ $scope.showLoader = false;
	 });
});	 


	
