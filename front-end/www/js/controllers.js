angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})
  
.controller('forget1',function($scope,$state,NewPassword){
  $scope.reemail={
    mail:""
  };
  $scope.step1=function () {
    NewPassword.email=$scope.reemail.mail;
    $state.go('forget-password.code');
    console.log(NewPassword)
  }
})

.controller('forget2',function($scope,$state,NewPassword){
  $scope.recode="";
  $scope.step2=function () {
    NewPassword.code=$scope.recode;
    $state.go('forget-password.re');
    console.log(NewPassword)
  };
})

.controller('forget3',function($scope,$state,NewPassword){
  $scope.resuccess=false;
  $scope.pass={
    pass1:"",
    pass2:""
  };
  $scope.step3=function () {
    NewPassword.password1=$scope.pass.pass1;
    NewPassword.password2=$scope.pass.pass2;
    NewPassword.password=$scope.pass.pass2;
    $state.go('login');
    console.log(NewPassword)
  };
})

.controller('ForgetPwdCtrl',function ($scope,$state,NewPassword) {
    console.log("lalala")
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
