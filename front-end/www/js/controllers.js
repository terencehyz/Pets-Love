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
.controller('LoginCtrl',function ($scope,  $ionicPopup, $state, $ionicLoading, $window, $ionicPlatform,AccountService) {

  $scope.data={};
  $scope.turncreate=function () {
    $state.go('create-account')
  };

  $scope.turnforget=function () {
    $state.go('forget-password.email')
  };

  $scope.login=function () {
    $ionicLoading.show({
      template:'登陆中'
    });

    AccountService.loginUser($scope.data.mail,$scope.data.password).then(function (data) {
      if(data.judge==1){
        localStorage.haslogin=1;
        $ionicLoading.hide();
        $state.go('tab.dash');
      }
      else{
        localStorage.haslogin=0;
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: '登录失败',
          template: '密码或用户名错误！'
        });
      }
    })
  }
})
/*注册*/
.controller('CreateAccountCtrl',function ($scope, $state, $ionicPopup,$ionicLoading,AccountService) {

  $scope.data={};

  $scope.register=function () {
    //注册功能
    //检测用户输入
    //判断空的输入
    var email=$scope.data.mail;
    var name=$scope.data.nickname;
    var password = $scope.data.password;
    var passwordconfirm = $scope.data.passwordconfirm;
    if(checkMail(email)){
      //检查两次密码是否相同
      if(name==undefined||name==''){
        var alertPopup=$ionicPopup.alert({
          title:'用户名出错',
          template:'用户名不能为空！'
        });
      }else if(password==undefined||passwordconfirm==undefined){
        var alertPopup=$ionicPopup.alert({
          title:'密码出错',
          template:'密码不能低于六位！'
        });
      }else if(password.length<6){
        var alertPopup=$ionicPopup.alert({
          title:'密码出错',
          template:'密码不能低于六位！'
        });
      }else{
        if(password!=passwordconfirm){
          var alertPopup=$ionicPopup.alert({
            title:'两次密码不一致',
            template:'请检查输入的密码'
          });
        }
        else{
          // $ionicLoading.show({
          //   template:'注册中'
          // });
          console.log('3');
          AccountService.register(email,name,password).then(function (res) {
            console.log('4');
            //alert(JSON.stringify(res));
            //$ionicLoading.hide();
            if(res.response==1){
              var alertPopup=$ionicPopup.alert({
                title:'注册成功',
                template:'现在可以去登陆了！'
              });
              alertPopup.then(function(res){
                //确认后跳转
                $state.go('login');
              })
            }
            console.log(typeof res.response);
            console.log(res.response);
            if(res.response==-1){
               var alertPopup=$ionicPopup.alert({
                 title:'注册失败',
                 template:'此邮箱已经注册,请更换'
               });
            }
          });
          console.log('5');
          //.then(function(data){
          //   console.log(data);
          //   //注册成功，并提示用户
          //   $ionicLoading.hide();
          //   var alertPopup=$ionicPopup.alert({
          //     title:'注册成功',
          //     template:'现在可以去登陆了！'
          //   });
          //   alertPopup.then(function(res){
          //     //确认后跳转
          //     $state.go('login');
          //   })
          // }).error(function (data) {
          //   $ionicLoading.hide();
          //   var alertPopup=$ionicPopup.alert({
          //     title:'注册失败',
          //     template:'此邮箱已经注册,请修改后重新注册！'
          //   });
          // })
        }
      }
    }else{
      var alertPopup=$ionicPopup.alert({
        title:'邮箱错误',
        template:'请修改后重新注册！'
      });
    }
  };

  var checkMail = function(szMail) {
    //var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var szReg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,4}$/;;
    var bChk = szReg.test(szMail);
    return bChk;
  }

  $scope.turnlogin=function () {
    $state.go('login');
  };
  $scope.turndash=function () {
    $state.go('tab.dash');
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

  $scope.logout = function() {
    localStorage.removeItem("haslogin");
    $scope.data.mail = "";
    $scope.data.password = "";
    localStorage.secretKey = "";
    localStorage.mail = "";
    localStorage.account = "";
    localStorage.phone = "";
    localStorage.photo = "";
    localStorage.pets = "";
    $state.go("login");
  }

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
.controller('userProfileCtrl',function ($scope,userDetailInformation,AccountService) {
  $scope.userInfo = userDetailInformation.pluser();
  console.log(JSON.stringify(userDetailInformation.pluser()));

  $scope.saveInfo=function (userInfo) {
    $ionicLoading.show({
      template:'更新中'
    });
    AccountService.modify(userInfo).success(function (data) {
      $ionicLoading.hide();
      var alertPopup=$ionicPopup.alert({
        title:'已保存',
        template:'个人信息已更新！'
      });
    }).error(function (data) {
      $ionicLoading.hide();
      var alertPopup=$ionicPopup.alert({
        title:'修改失败！',
        template:'邮箱格式错误！'
      });
    })
  }

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
