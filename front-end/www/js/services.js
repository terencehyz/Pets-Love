angular.module('starter.services', [])

.factory('NewPassword',function () {
  return {
    lose: {
      password:"",
      password1:"",
      password2:"",
      mail:"",
      code:""}
  };
})

.factory('userDetailInformation',function () {
  var dataUser = {
    id:"tom",
    email:"78944562@qq.com",
    phone:"13327896654",
    password:"123456789",
    photo:"img/tom.JPG",
    secretKey:"1234567890",
    pets:"",
    location:{
      x:"",
      y:""
    },
    bio:"此家伙很懒什么都没留下。"
  }
  return{
    pluser:function () {
      return dataUser;
    }
  };
})

.factory('myFollowing',function(){
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var following = [{
    mail:'test12@qq.com',
    account: '12efw',
    face: 'img/ben.png'
  }, {
    mail:'test34@qq.com',
    account: '34few',
    face: 'img/max.png'
  }, {
    mail:'test56@qq.com',
    account: '56fe',
    face: 'img/adam.jpg'
  }, {
    mail:'test78@qq.com',
    account: '78ww',
    face: 'img/perry.png'
  }, {
    mail:'test9@qq.com',
    account: '9lll',
    face: 'img/mike.png'
  }];
  return{
    all:function () {
      return following;
    },
    remove:function () {

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
});
