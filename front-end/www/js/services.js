angular.module('starter.services', [])
  .factory('userDetailInformation',function () {

    if(localStorage.haslogin==1)
    {
      if(localStorage.photo==undefined||localStorage.photo==''||localStorage.photo=="")
      {
        localStorage.photo="img/user.png";
      }
      var dataUser = {
        sex:localStorage.sex,
        id:localStorage.account,
        email:localStorage.mail,
        phone:localStorage.phone,
        password:"",
        photo:localStorage.photo,
        secretKey:localStorage.secretKey,
        pets:localStorage.pets,
        location:{
          x:"",
          y:""
        }
      }
    }
    else{
      var dataUser = {
        sex:"",
        id:"",
        email:"",
        phone:"",
        password:"",
        photo:"img/user.png",
        secretKey:"",
        pets:"",
        location:{
          x:"",
          y:""
        }
      }
    }
    return{
      pluser:function () {
        return dataUser;
      }
    };
  })
  .factory('myFollowing',function () {
    return{
      all:function ($scope) {
        var d=$q.defer();
        var promise=d.promise;
        var url="http://183.175.12.168/Pets-Love/back-end/user/login.php?email="+email+"&password="+password+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function (data) {

          })
      }
    }
  })
  .factory('myFollower',function () {

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
  .factory('Pets', function () {

        return {
          allPets: function () {
            var petsString = window.localStorage['pets'];
            if (petsString) {
                var pets = angular.fromJson(petsString);

                  return pets;
              }
            return [];
          },

          save: function (pets) {
            window.localStorage['pets'] = angular.toJson(pets);
          },

          //创建一个新的宠物

              newPet: function () {
            return {
                //indexId:0,
                type:'',
                typeDetail:'',
                name:'',
                sex:'',
                age:'',
                id:'',
                about:'',
                url:''
            };
          }
      };
    })
  .service('AccountService',function ($http,$q) {
    return{
      register: function(email, name, password) {
        var deferred = $q.defer();
        password=hex_md5(password);
        var url = "http://183.175.12.168/Pets-Love/back-end/user/register.php?email=" + email + "&username=" + name + "&password=" + password + "&callback=JSON_CALLBACK";
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
        var url="http://183.175.12.168/Pets-Love/back-end/user/login.php?email="+email+"&password="+password+"&callback=JSON_CALLBACK";
        $http.get(url)
          .success(function(response){
            loginResult=response;
            localStorage.password=loginResult.h_password;
            localStorage.secretKey=loginResult.h_secret_key;
            localStorage.mail=loginResult.h_email;
            localStorage.account=loginResult.h_account;
            localStorage.phone=loginResult.h_call;
            localStorage.photo=loginResult.h_photo;
            localStorage.sex=loginResult.h_sex;
            localStorage.pets=loginResult.pets;
            deferred.resolve(loginResult);
          });
        return promise;
      },
      modify:function (userInfo) {
        var deferred = $q.defer();
        var url="http://183.175.12.168/Pets-Love/back-end/user/changemessage.php?h_account="+ userInfo.id + "&h_secret_key=" + userInfo.secretKey+"&h_sex=" + userInfo.sex+ "&h_call=" + userInfo.phone + "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      CodeMail:function(email){
        var deferred = $q.defer();
        var url="http://183.175.12.168/Pets-Love/back-end/user/sendmail.php?h_email="+ email+ "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      getCode:function (email) {
        console.log(email);
        var deferred = $q.defer();
        var url="http://183.175.12.168/Pets-Love/back-end/user/judge-email.php?h_email="+ email+ "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      toNew:function (code) {
        var mail=localStorage.getItem("findPwd");
        console.log(mail);
        var deferred = $q.defer();
        var url="http://183.175.12.168/Pets-Love/back-end/user/judgecaptcha.php?captcha="+ code + "&h_email=" + mail + "&callback=JSON_CALLBACK";
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
        var url="http://183.175.12.168/Pets-Love/back-end/user/modifypassword.php?h_newpassword="+password+"&email=" + localStorage.findPwd + "&callback=JSON_CALLBACK";
        $http.get(url).success(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      }
    }
  });
