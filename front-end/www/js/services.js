angular.module('starter.services', [])
  /*关注*/
  .factory('myFollowing',function ($http,$q) {
    return{
      all:function ($scope) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/showfollowing.php?h_id="+localStorage.keyId+"&callback=JSON_CALLBACK";//此处为得到的following
        $http.get(url)
          .success(function(res) {
            if(res.judge==1){
              $scope.following=res.host;
            }else{
              $scope.following='';
            }
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      delMyFollowing:function(following,myfollow){
        var deferred = $q.defer();
        following.splice(following.indexOf(myfollow), 1);
        var url = "http://119.29.37.225/Pets-Love/back-end/user/delfollowing.php?h_id=" + localStorage.keyId +"&follow="+myfollow.id+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      delMyFollowing2:function(myfollow){
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/delfollowing.php?h_id=" + localStorage.keyId +"&follow="+myfollow+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      }
    }
  })
  /*粉丝*/
  .factory('myFollower',function ($http,$q) {
    return{
      all:function ($scope) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/showfollow.php?h_id="+localStorage.keyId+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            if(res.judge==1){
              $scope.follower=res.host;
            }else{
              $scope.follower='';
            }
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      toMyFollower:function (myfollower) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/addfollowing.php?h_id=" + localStorage.keyId +"&follow="+myfollower+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      toMyFollower2:function (myfollower) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/addfollowing.php?h_id=" + localStorage.keyId +"&follow="+myfollower+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      }
    }
  })
  .factory('backEndInfo',function($http,$q){
    return{
     allSlide:function ($rootScope) {
       var deferred = $q.defer();
       var url = "http://119.29.37.225/Pets-Love/back-end/user/main_picture.php?callback=JSON_CALLBACK";
       $http.get(url)
         .success(function(res) {
           $rootScope.slides=res;
           deferred.resolve(res);
         });
       return deferred.promise;
     }
    }
  })
  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })
  .factory('Pets', function ($http,$q) {
    return {
      /*附近的宠物*/
      nearPet:function ($scope,dataLng,dataLat) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/nearby.php?h_longtitude="+dataLng+"&h_latitude="+dataLat+"&h_secret_key="+localStorage.secretKey+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            $scope.allNearPet=res;
            localStorage.nearUsers=JSON.stringify(res);
            /*if(res.data==1){
              $scope.allNearPet=res.data;
              localStorage.nearUsers=JSON.stringify(res.data);
            }else{
              $scope.allNearPet=res.data;
              localStorage.nearUsers='';
            }*/
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      /*主页模糊搜索*/
      searchPet:function (toGetPet,$scope) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/searchpets.php?message="+toGetPet+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            if(res.judge==1){
              $scope.allPetSearch=res.pets;
              localStorage.mySearchPet=JSON.stringify(res.pets);
            }else{
              $scope.allPetSearch='';
            }
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      /*主页推荐宠物*/
      recommendPet:function ($scope) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/WithRe.php?h_id="+localStorage.keyId+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            $scope.allPetRecommend=res;
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      allPets: function ($scope) {
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/showpet.php?h_id="+localStorage.keyId+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res){
            localStorage.myPets=JSON.stringify(res.pets);
            $scope.allPets=res.pets;
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      update: function (pet) {
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/changepets.php?p_name="+pet.p_name+"&p_sex="+pet.p_sex+"&host_id="+localStorage.keyId+"&id="+pet.id+"&p_type="+pet.p_type+"&p_age="+pet.p_age+"&p_about="+pet.p_about+"&p_detail_type="+pet.p_detail_type+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res){
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      newPet: function (pet) {
        var deferred = $q.defer();
        var url = "http://119.29.37.225/Pets-Love/back-end/user/addpet.php?p_name=" + pet.name + "&p_sex=" + pet.sex + "&p_type="+pet.type+"&p_age="+pet.age+"&host_id="+localStorage.keyId+"&p_about="+pet.about+"&p_detail_type=" +pet.typeDetail+ "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      },
      delPet: function (pet) {
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/delpet.php?id="+pet.id+"&h_id="+localStorage.keyId+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        return deferred.promise;
      }
    };
  })
  .factory('Camera', ['$q', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])
  .service('AccountService',function ($http,$q) {
    return{
      register: function(email, name, password) {
        var deferred = $q.defer();
        password=hex_md5(password);
        var url = "http://119.29.37.225/Pets-Love/back-end/user/register.php?email=" + email + "&username=" + name + "&password=" + password + "&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(res) {
            deferred.resolve(res);
          });
        console.log('7');
        return deferred.promise;
      },
      loginUser:function (email,password) {
        password=hex_md5(password);
        var deferred = $q.defer();
        var promise = deferred.promise;
        var loginResult=new Object();
        var url="http://119.29.37.225/Pets-Love/back-end/user/login.php?email="+email+"&password="+password+"&h_latitude="+0+"&h_longitude="+0+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(response){
            loginResult=response;
            localStorage.keyId=loginResult.id;
            localStorage.password=loginResult.h_password;
            localStorage.secretKey=loginResult.h_secret_key;
            localStorage.mail=loginResult.h_email;
            localStorage.account=loginResult.h_account;
            localStorage.phone=loginResult.h_call;
            if(loginResult.h_photo){
              localStorage.photo=loginResult.h_photo;
            }else{
              localStorage.photo="../img/user.png";
            }
            localStorage.sex=loginResult.h_sex;
            if(loginResult.judge==1){
              localStorage.pets=loginResult.pet;
            }else{
              localStorage.pets='';
            }
            deferred.resolve(loginResult);
          });
        return promise;
      },
      modify:function (userInfo) {
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/changemessage.php?h_account="+ userInfo.account + "&h_secret_key=" + localStorage.secretKey+"&h_sex=" + userInfo.sex+ "&h_call=" + userInfo.phone + "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      CodeMail:function(email){
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/sendmail.php?h_email="+ email+ "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      getCode:function (email) {
        console.log(email);
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/judge-email.php?h_email="+ email+ "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      toNew:function (code) {
        var mail=localStorage.getItem("findPwd");
        console.log(mail);
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/judgecaptcha.php?captcha="+ code + "&h_email=" + mail + "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      aNew:function (password) {
        password=hex_md5(password);//进行加密
        var mail=localStorage.getItem("findPwd");
        if(mail==""||mail==''||mail==undefined)
        {
          mail=localStorage.mail;
        }
        console.log(mail);
        var deferred = $q.defer();
        var url="http://119.29.37.225/Pets-Love/back-end/user/modifypassword.php?h_newpassword="+password+"&email=" + localStorage.findPwd + "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      }
    }
  });
