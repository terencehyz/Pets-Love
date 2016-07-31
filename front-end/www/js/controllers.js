angular.module('starter.controllers', [])
/*主页*/
.controller('DashCtrl', function($scope) {

})
/*忘记密码1-3*/
.controller('forget1',function($scope,$state,NewPassword){
  $scope.youxiang="";
  $scope.step1=function () {
    NewPassword.lose.mail=$scope.youxiang;
    $state.go('forget-password.code');
    console.log(NewPassword.lose)
  }
})
.controller('forget2',function($scope,$state,NewPassword){
  $scope.recode="";
  $scope.step2=function () {
    NewPassword.lose.code=$scope.recode;
    $state.go('forget-password.re');
    console.log(NewPassword.lose)
  };
})
.controller('forget3',function($scope,$state,NewPassword){
  $scope.resuccess=false;
  $scope.pass={
    pass1:"",
    pass2:""
  };
  $scope.step3=function () {
    NewPassword.lose.password1=$scope.pass.pass1;
    NewPassword.lose.password2=$scope.pass.pass2;
    NewPassword.lose.password=$scope.pass.pass2;
    $state.go('login');
    console.log(NewPassword.lose)
  };
})
.controller('ForgetPwdCtrl',function ($scope,$state,NewPassword) {
})
/*登陆*/
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
/*注册*/
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
/*聊天*/
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
/*聊天详细*/
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SalesCtrl',function ($scope) {

})

.controller('ReleaseCtrl',function ($scope) {

})
/*账户*/
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
/*设置*/
.controller('MySettingsCtrl',function ($scope) {

})
/*关注的人*/
.controller('myFollowingCtrl',function ($scope) {

})
/*我的粉丝*/
.controller('myFollowerCtrl',function ($scope) {

})
/*关于我们*/
.controller('aboutUsCtrl',function ($scope) {

})
/*我的宠物*/
.controller('myPetCtrl',function ($scope) {

})
/*我的宠物详情*/
.controller('myPetDetailCtrl',function ($scope) {

})
/*用户详情*/
.controller('userProfileCtrl',function ($scope,userDetailInformation) {
  $scope.userInfo = userDetailInformation.pluser();
  console.log(JSON.stringify(userDetailInformation.pluser()))
});
