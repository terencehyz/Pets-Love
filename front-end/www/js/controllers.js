angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.a='';
  $scope.b='';
  $scope.c=0;
  $.post("login.php",{id:$scope.a,pwd:$scope.b},function(){
  })
})

/*以下为注册页面的ctrl*/

.controller('CreateAccountCtrl',function ($scope) {
  $scope.createemail='';
  $scope.createpwd1='';
  $scope.createpwd2='';
  $scope.createerror=false;
  $scope.incomplete=true;
  $scope.$watch('createemail',function () {
    $scope.test();
  });
  $scope.$watch('createpwd1',function () {
    $scope.test();
  });
  $scope.$watch('createpwd2',function () {
    $scope.test();
  });
  $scope.test=function () {
    if($scope.createpwd1==$scope.createpwd2){
      $scope.createerror=false;
    }
    else{
      $scope.createerror=true;
    }

    if(!$scope.createemail.length||!$scope.createpwd1.length||!$scope.createpwd2.length){
      $scope.incomplete=true;
    }
    else{
      $scope.incomplete=false;
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SalesCtrl',function ($scope) {

})

.controller('ReleaseCtrl',function ($scope) {

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
