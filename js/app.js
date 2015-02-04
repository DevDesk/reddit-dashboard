var redditApp = angular.module('RedditApp',['ui.bootstrap'])

redditApp.controller('DashboardController',['$scope', '$http', function($scope, $http){

  $scope.posts = {};
  $scope.searchTerms = JSON.parse(window.localStorage.searchTerm || "[]");
  // $scope.searchTerms = []

  $scope.search = function() {
    var req = {
      url: "http://www.reddit.com/search.json?",
      params: {
        q: $scope.searchTerm,
      }
    }

    $http(req).success(function(data) {

      if($scope.searchTerms.indexOf($scope.searchTerm) == -1) {
        $scope.searchTerms.push($scope.searchTerm);
        window.localStorage.searchTerm = JSON.stringify($scope.searchTerms);
        console.log($scope.searchTerms);
      }
        $scope.posts = data.data.children;
        $scope.searchTerm.setPristine();
        // $scope.searchTerm = ""
        //have to set ng-model="searchTerm" to empty string or setPristing() to clear input field
        // console.log($scope.posts)
    });
  }

  $scope.selectHistory = function(idx){
    var newSearch = JSON.parse(window.localStorage.searchTerm)[idx]
    var req = {
      url: "http://www.reddit.com/search.json?",
      params: {
        q: newSearch,
      }
    }

    $http(req).success(function(data) {
        window.localStorage.searchTerm = JSON.stringify($scope.searchTerms);
        $scope.posts = data.data.children;
        // console.log($scope.searchTerms);
        // console.log($scope.posts)
    });
  }

  $scope.delete = function(idx){
    $scope.searchTerms.splice(idx,1);
    window.localStorage.searchTerm = JSON.stringify($scope.searchTerms);
    if(idx > 0){
      $scope.selectHistory(idx-1)
    } else {
      $scope.selectHistory(idx)
    }
  }

  if ($scope.searchTerm) {
    $scope.search();
  }
}])

// console.log('this file is running.');