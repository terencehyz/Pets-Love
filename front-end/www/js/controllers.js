angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.a='';
  $scope.b='';
  $scope.c=0;
  $.post("login.php",{id:$scope.a,pwd:$scope.b},function(){
  })
})

.controller('ForgetPwdCtrl',function ($scope,$state) {
  $scope.newpwd1="";
  $scope.newpwd2="";
  $scope.reemail="";
  $scope.recode="";
  $scope.resuccess=false;
  $scope.turnlogin=function () {
    $state.go('login')
  }
  $scope.step1=function () {
    $state.go('forget-password.code')
  };
})

.controller('LoginCtrl',function ($scope,$state) {
  $scope.loginmail='';
  $scope.loginpwd='';
  $scope.loginvalid=true;
  $scope.servervalid=function () {
    /*此处向服务器验证账号密码是否匹配*/
    if($scope.loginvalid){
      $state.go('tab.dash');
    }
    else{
      loginvalid=false;
    }
  };
  $scope.turncreate=function () {
    $state.go('create-account')
  };

  $scope.turnforget=function () {
    $state.go('forget-password.email')
  };
})

/*以下为注册页面的ctrl*/
.controller('CreateAccountCtrl',function ($scope,$state) {
  $scope.createnickname='';
  $scope.createemail='';
  $scope.createpwd1='';
  $scope.createpwd2='';
  $scope.namevaild=true;
  $scope.emailvaild=true;
  $scope.createerror=false;
  $scope.incomplete=false;

  $scope.turnlogin=function () {
    $state.go('login');
  };
  $scope.turndash=function () {
    $state.go('tab.dash');
  };

  $scope.$watch('createnickname',function () {
    $scope.test();
  });
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

    if(!$scope.createemail.length||!$scope.createpwd1.length||!$scope.createpwd2.length||!$scope.createnickname.length){
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
