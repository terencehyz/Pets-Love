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

.controller('ReleaseCtrl',function ($scope, $state, Pets) {

  $scope.pets = Pets.allPets();

  $scope.addPet = function () {
    $state.go('tab.petDetail', {});
  }

})

/*宠物详情or添加新宠物*/
.controller('petDetailCtrl',function ($scope, $state, $stateParams, Pets) {
  $scope.DelButtonShow = false;

  //获取记录详情
  var petId = $stateParams.petId;
  var pets = Pets.allPets();

  //根据petId值，判断是编辑还是添加
  if (petId) {

    $scope.pet = pets[petId];
    $scope.petId = petId;
    $scope.DelButtonShow = true;

    $scope.savePet = function () {

      pets[petId] = $scope.pet;
      Pets.save(pets);
      $state.go('tab.release', { });
    }

  } else {
    $scope.pet = Pets.newPet();
    $scope.savePet = function () {
      pets.push($scope.pet);
      Pets.save(pets);
      $state.go('tab.release', { });
    }
  }

  //删除宠物
  $scope.delPet = function (petId) {

    pets.splice(petId, 1);
    Pets.save(pets);
    $state.go('tab.release', { });
  };
})
/*账户*/
.controller('AccountCtrl', function($scope,userDetailInformation) {
  $scope.userInfo=userDetailInformation.pluser();
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
/*用户详情*/
.controller('userProfileCtrl',function ($scope,userDetailInformation) {
  $scope.userInfo = userDetailInformation.pluser();
  console.log(JSON.stringify(userDetailInformation.pluser()))
})
/*首页轮播*/
.controller('HouseCtrl', function($scope, $ionicSlideBoxDelegate) {
  //为了验证属性active-slide定义的模型，angularjs是mvc模式
  $scope.model = {
    activeIndex:0
  };

//此事件对应的是pager-click属性，当显示图片是有对应数量的小圆点，这是小圆点的点击事件
  $scope.pageClick = function(index){
    //alert(index);

    $scope.model.activeIndex = 2;
  };

//当图片切换后，触发此事件，注意参数
  $scope.slideHasChanged = function($index){
    //alert($index);

  };
  //这是属性delegate-handle的验证使用的，其实没必要重定义，直接使用$ionicSlideBoxDelegate就可以
  $scope.delegateHandle = $ionicSlideBoxDelegate;
});
