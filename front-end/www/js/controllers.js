angular.module('starter.controllers', [])
.controller('ReleaseCtrl',function ($scope, $state, Pets) {
  Pets.allPets($scope);
  $scope.toAddPet = function () {
    $state.go('tab.addPet');
  };

})
.controller('DashCtrl', function($scope,$rootScope,$state,$ionicPopup,backEndInfo,Pets,myFollower,myFollowing) {

  Pets.recommendPet($scope);
  backEndInfo.allSlide($rootScope);
  $scope.toSearch=function () {
    $state.go('tab.search');
  };
  $scope.toFollow=function (myfollower) {
    myFollower.toMyFollower2(myfollower).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '关注失败',
          template: '您已关注此用户'
        });
      }
    })
  };
  $scope.unFollow=function (myfollow) {
    myFollowing.delMyFollowing2(myfollow).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '取消关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '失败',
          template: '您已取消关注此用户'
        });
      }
    })
  };
})
.controller('SearchCtrl',function ($ionicLoading,$scope,$ionicPopup,Pets) {
  $scope.userSearch=function (toGetPet) {
    if(toGetPet){
      Pets.searchPet(toGetPet,$scope).then(function (data) {
        if(data.judge==0){
          var alertPopup = $ionicPopup.alert({
            title: '搜索失败',
            template: '宝宝没有搜到，换个关键词吧'
          });
        }
      })
    }
  }
})
.controller('SearchDetailCtrl',function ($scope,$location,$ionicPopup,myFollowing,myFollower) {
  $scope.data=JSON.parse(localStorage.mySearchPet)[$location.search().id];
  console.log(localStorage.mySearchPet);
  $scope.toFollow=function (myfollower) {
    myFollower.toMyFollower2(myfollower).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '关注失败',
          template: '您已关注此用户'
        });
      }
    })
  };
  $scope.unFollow=function (myfollow) {
    myFollowing.delMyFollowing2(myfollow).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '取消关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '失败',
          template: '您已取消关注此用户'
        });
      }
    })
  };
})
.controller('forget1',function($scope,$state,$ionicPopup,AccountService){
  $scope.data={
    youxiang:''
  }
  $scope.step1=function () {
    console.log($scope.data.youxiang);
    localStorage.setItem("findPwd",$scope.data.youxiang);
    AccountService.getCode($scope.data.youxiang).then(function (data) {
      if(data.judge_email==1){
        AccountService.CodeMail($scope.data.youxiang).then(function (res) {
          if(res.judge==1){
            $state.go('forget-password.code');
          }
          else{
            var alertPopup = $ionicPopup.alert({
              title: '发生错误',
              template: '请重试'
            });
          }
        });
      }
      else{
        var alertPopup = $ionicPopup.alert({
          title: '邮箱错误',
          template: '此邮箱未注册，请重新填写！'
        });
      }
    });

  }
})
.controller('forget2',function($scope,$state,$ionicPopup,AccountService){
  $scope.recode="";
  $scope.step2=function () {
    AccountService.toNew($scope.recode).then(function (data) {
      if(data.judge==1){
        $state.go('forget-password.re');
      }
      else{
        var alertPopup = $ionicPopup.alert({
          title: '验证码错误',
          template: '请重新填写！'
        });
      }
    });
  };
})
.controller('forget3',function($scope,$state,$ionicPopup,AccountService){
  $scope.pass={
    pass1:"",
    pass2:""
  };
  $scope.step3=function () {
    AccountService.aNew($scope.pass.pass1).then(function (data) {
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '修改成功',
          template: '去登陆'
        });
        $state.go('login');
      }
      else{
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: '请重新填写！'
        });
      }
    });
  };
})
.controller('ForgetPwdCtrl',function ($scope,$state,AccountService) {
})
.controller('LoginCtrl',function ($scope,  $ionicPopup, $state, $ionicLoading, $window, $ionicPlatform,AccountService) {
  //自动跳转到主页
  if(localStorage.haslogin==1)
  {
    $state.go('tab.dash');
  }

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
.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('NearDetailCtrl',function($scope,$location,$ionicPopup,myFollower,myFollowing){
  $scope.data=JSON.parse(localStorage.nearUsers)[$location.search().id];
  $scope.toFollow=function (myfollower) {
    myFollower.toMyFollower2(myfollower).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '关注失败',
          template: '您已关注此用户'
        });
      }
    })
  };
  $scope.unFollow=function (myfollow) {
    myFollowing.delMyFollowing2(myfollow).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '取消关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '失败',
          template: '您已取消关注此用户'
        });
      }
    })
  };
})
.controller('SalesCtrl',function ($scope,$rootScope,$ionicPopup,$ionicLoading,Pets) {
  $rootScope.location={
    Lng:'',
    Lnt:''
  };

  /////高德
  var map, geolocation;
  map = new AMap.Map('container', {
    resizeEnable: true
  });
  map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 5000,           //超过5秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
  });
  //解析定位结果
  function onComplete(data) {
    $rootScope.location.Lng = data.position.getLng();
    $rootScope.location.Lat = data.position.getLat();
    $rootScope.$apply();
    nearPetSearch($rootScope.location.Lng,$rootScope.location.Lat);
  }
  //解析定位错误信息
  function onError(data) {
    $rootScope.$apply();
  }
  //获取附近宠物
  function nearPetSearch(dataLng,dataLat){
    localStorage.hasPop=1;
    console.log(dataLng,dataLat);
    Pets.nearPet($scope,dataLng,dataLat);
  }
  ///

  $scope.getLocation=function () {
    //高德
    var map, geolocation;
    map = new AMap.Map('container', {
      resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 5000,           //超过5秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
      $rootScope.location.Lng = data.position.getLng();
      $rootScope.location.Lat = data.position.getLat();
      $rootScope.$apply();
      nearPetSearch($rootScope.location.Lng,$rootScope.location.Lat);
    }
    //解析定位错误信息
    function onError(data) {
      $rootScope.$apply();
    }
    //获取附近宠物
    function nearPetSearch(dataLng,dataLat){
      localStorage.hasPop=1;
      console.log(dataLng,dataLat);
      Pets.nearPet($scope,dataLng,dataLat);
    }
  };
})
.controller('petDetailCtrl',function ($scope, $state, $stateParams, $ionicPopup, $ionicActionSheet,Pets,$location,Camera) {
  $scope.data=JSON.parse(localStorage.myPets)[$location.search().id];
  $scope.delPet=function (pet) {
    Pets.delPet(pet).then(function (data) {
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '删除成功',
          template: '成功删除宠物'
        });
        $state.go('tab.release');
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '删除失败',
          template: '发生错误'
        });
      }
    })
  };
  $scope.savePet=function (pet) {
    if($scope.data.p_name==undefined||$scope.data.p_name==''){
      var alertPopup = $ionicPopup.alert({
        title: '宠物名不合法',
        template: '请确认宠物名不为空！'
      });
    }else if($scope.data.p_age==undefined||$scope.data.p_age==''){
      var alertPopup = $ionicPopup.alert({
        title: '宠物年龄合法',
        template: '请确认宠物年龄不为空！'
      });
    }else if($scope.data.p_about==undefined||$scope.data.p_about==''){
      var alertPopup = $ionicPopup.alert({
        title: '宠物介绍不合法',
        template: '请确认宠物介绍不为空！'
      });
    }else{
      Pets.update(pet).then(function (data) {
        if(data.judge==1){
          var alertPopup = $ionicPopup.alert({
            title: '成功',
            template: '成功修改宠物信息！'
          });
          $state.go('tab.release');
        }else{
          var alertPopup = $ionicPopup.alert({
            title: '失败',
            template: '发生错误！'
          });
        }
      })
    }
  };
  $scope.me={
    image:''
  };
  $scope.choosePicMenu = function() {
    var type = 'gallery';
    $ionicActionSheet.show({
      buttons: [
        { text: '&nbsp;拍照' },
        { text: '&nbsp;从相册选择' }
      ],
      titleText: '选择照片',
      cancelText: '取消',
      cancel: function() {
      },
      buttonClicked: function(index) {
        if(index == 0){
          type = 'camera';
        }else if(index == 1){
          type = 'gallery';
        }
        //Camera.getPicture(type)->根据选择的“选取图片”的方式进行选取
        Camera.getPicture(type).then(
          //返回一个imageURI，记录了照片的路径
          function (imageURI) {
            console.log(imageURI);
            $scope.me.image = imageURI;
            $scope.$apply();
          },
          function (err) {
          });
        return true;
      }
    });
  };

  var  options= new FileUploadOptions();
  options.fileKey="ffile";
  options.fileName=$scope.me.image.substr($scope.me.image.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";
  //用params保存其他参数，例如昵称，年龄之类
  var params = {};
  params['name'] = $scope.me.name;
  //把params添加到options的params中
  options.params = params;
  //新建FileTransfer对象
  var ft = new FileTransfer();
  //上传文件
  ft.upload(
    $scope.me.image,
    encodeURI('some url'),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
    uploadSuccess,
    uploadError,
    options);
  //upload成功的话
  function uploadSuccess(r) {
    var resp = JSON.parse(r.response);
    if(resp.status == 0){
      $ionicPopup.alert({
        title: '成功',
        cssClass: 'alert-text',
        template:  '上传成功'
      });
      //返回前一页面
      //$navHistoryback();
    }else{
      $ionicPopup.alert({
        title: '失败',
        cssClass: 'alert-text',
        template:  '上传失败'
      });
    }
  }
//upload失败的话
  function uploadError(error) {
  }

  $scope.petTypeDetail=["猫","狗","龙猫","仓鼠","鱼","虾","松鼠","鸟","豚鼠","龟","兔","蛇","其他"];
  $scope.petType=["猫","狗","龙猫","仓鼠","鱼","虾","松鼠","鸟","豚鼠","龟","兔","蛇","其他"];
  $scope.petGender=["雌性","雄性"];
})
.controller('addPetCtrl',function ($scope, $state, $stateParams, $ionicPopup, Pets) {
  $scope.pet={
    age:'',
    name:'',
    about:''
  };
  $scope.petTypeDetail=["猫","狗","龙猫","仓鼠","鱼","虾","松鼠","鸟","豚鼠","龟","兔","蛇","其他"];
  $scope.petType=["猫","狗","龙猫","仓鼠","鱼","虾","松鼠","鸟","豚鼠","龟","兔","蛇","其他"];
  $scope.petGender=["雌性","雄性"];
  $scope.addPet=function () {
    console.log($scope.pet);
    Pets.newPet($scope.pet).then(function (data) {
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '添加成功',
          template: '成功添加宠物'
        });
        $state.go('tab.release');
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '添加失败',
          template: '此宠物已存在'
        });
        $state.go('tab.release');
      }
    })
  };
})
.controller('AccountCtrl', function($scope,$state,$ionicPopup) {
  if(localStorage.haslogin==1){
    $scope.more="#/tab/account/userProfile";
  }
  else{
    $scope.more="#/login";
  }
  $scope.userInfo={
    photo:localStorage.photo,
    id:localStorage.id,
    email:localStorage.mail,
    phone:localStorage.phone,
    sex:localStorage.sex,
    account:localStorage.account
  };

  $scope.logout = function() {
    localStorage.clear();
    localStorage.haslogin=0;
    localStorage.hasPop=0;
    console.log(localStorage);
    $state.go("login");
  }

})
.controller('MySettingsCtrl',function ($scope) {
  $scope.userInfo={
    photo:localStorage.photo,
    account:localStorage.account,
    email:localStorage.mail,
    phone:localStorage.phone,
    sex:localStorage.sex
  };
})
.controller('myFollowingCtrl',function ($scope,$state,$ionicPopup,myFollowing) {
  myFollowing.all($scope);
  $scope.remove=function (myfollow) {
    myFollowing.delMyFollowing($scope.following,myfollow).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '取消关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '失败',
          template: '您已取消关注此用户'
        });
      }
    })
  };
})
.controller('myFollowerCtrl',function ($scope,$ionicPopup,myFollower) {
  myFollower.all($scope);
  $scope.tofollow=function (myfollower) {
    myFollower.toMyFollower(myfollower).then(function(data){
      if(data.judge==1){
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: '关注成功'
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          title: '关注失败',
          template: '您已关注此用户'
        });
      }
    })
  };
})
.controller('aboutUsCtrl',function ($scope) {

})
.controller('userProfileCtrl',function ($scope,$stateParams,$ionicPopup,$ionicLoading,AccountService) {
  $scope.userInfo={
    photo:localStorage.photo,
    account:localStorage.account,
    id:localStorage.id,
    email:localStorage.mail,
    phone:localStorage.phone,
    sex:localStorage.sex
  };

  $scope.modifyPhoto=function () {

  };

  $scope.saveInfo=function (userInfo) {

    if(checkMail(userInfo.email)){
      if(userInfo.account==undefined||userInfo.id=='') {
        var alertPopup = $ionicPopup.alert({
          title: '昵称错误',
          template: '昵称不能为空！'
        });
      }
      else{
        if(userInfo.phone==undefined||userInfo.phone==''){
          var alertPopup = $ionicPopup.alert({
            title: '电话错误',
            template: '电话不能为空！'
          });
        }
        else{
          $ionicLoading.show({
            template:'更新中'
          });
          AccountService.modify(userInfo).then(function(data){
            $ionicLoading.hide();
            if(data.judge==1){
              localStorage.account=userInfo.account;
              localStorage.sex=userInfo.sex;
              localStorage.phone=userInfo.phone;
              console.log(localStorage);
              var alertPopup=$ionicPopup.alert({
                title:'已保存',
                template:'个人信息已更新！'
              });
            }
            else{
              var alertPopup=$ionicPopup.alert({
                title:'修改失败！',
                template:'邮箱格式错误！'
              });
            }
          })
        }
      }


    }else{
      var alertPopup=$ionicPopup.alert({
        title:'邮箱错误',
        template:'请重新填写邮箱！'
      });
    }
  }

  var checkMail = function(szMail) {
    //var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var szReg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,4}$/;;
    var bChk = szReg.test(szMail);
    return bChk;
  }

})

