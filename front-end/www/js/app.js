// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log(FileTransfer);
}
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.filters'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//路由
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //将Android的Tab置于底部开始
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  //将Android的Tab置于底部结束

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    /*登陆*/
  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'LoginCtrl'
  })
  .state('create-account',{
    url:'/create-account',
    templateUrl:'templates/create-account.html',
    controller: 'CreateAccountCtrl'
  })
  .state('tab.userProfile', {
    url: '/account/userProfile',
    views: {
      'tab-account': {
        templateUrl: 'templates/userProfile.html',
        controller: 'userProfileCtrl'
      }
    }
  })
  .state('tab.aboutus', {
    url: '/account/aboutus',
    views: {
      'tab-account': {
        templateUrl: 'templates/aboutus.html',
        controller: 'aboutUsCtrl'
      }
    }
  })
  .state('tab.myFollower', {
    url: '/account/myFollower',
    views: {
      'tab-account': {
        templateUrl: 'templates/myFollower.html',
        controller: 'myFollowerCtrl'
      }
    }
  })
  .state('tab.myFollowing', {
    url: '/account/myFollowing',
    views: {
      'tab-account': {
        templateUrl: 'templates/myFollowing.html',
        controller: 'myFollowingCtrl'
      }
    }
  })
  .state('tab.mysettings', {
    url: '/account/mysettings',
    views: {
      'tab-account': {
        templateUrl: 'templates/mysettings.html',
        controller: 'MySettingsCtrl'
      }
    }
  })
  .state('forget-password',{
    url:'/forget-password',
    templateUrl:'templates/ForgetPassword.html',
    controller: 'ForgetPwdCtrl'
  })
  .state('forget-password.email',{
    url:'/forget-password-email',
    views:{
      'forget-password-email':{
        templateUrl:'templates/ForgetPassword-email.html',
        controller:'forget1'
      }
    }
  })
  .state('forget-password.code',{
    url:'/forget-password-code',
    views:{
      'forget-password-code':{
        templateUrl:'templates/ForgetPassword-code.html',
        controller:'forget2'
      }
    }
  })
  .state('forget-password.re',{
    url:'/forget-password-re',
    views:{
      'forget-password-re':{
        templateUrl:'templates/ForgetPassword-re.html',
        controller:'forget3'
      }
    }
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.dash', {
    cache:false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.search',{
    cache:false,
    url:'/search',
    views:{
      'tab-dash':{
        templateUrl:'templates/tab-search.html',
        controller:'SearchCtrl'
      }
    }
  })
  .state('tab.searchDetail',{
    cache:false,
    url:'/searchDetail/:searchId',
    views:{
      'tab-dash':{
        templateUrl:'templates/searchDetail.html',
        controller:'SearchDetailCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.sales', {
    //cache:false,
    url: '/sales',
    views: {
      'tab-sales': {
        templateUrl: 'templates/tab-sales.html',
        controller: 'SalesCtrl'
      }
    }
  })
  .state('tab.nearDetail',{
    url:'/sales/:nearId',
    views:{
      'tab-sales':{
        templateUrl:'templates/nearDetail.html',
        controller:'NearDetailCtrl'
      }
    }
  })
  .state('tab.release',{
     cache:false,
     url:'/release',
     views:{
       'tab-release':{
         templateUrl: 'templates/tab-release.html',
         controller:'ReleaseCtrl'
       }
     }
   })
  .state('tab.petDetail',{
    url:'/petDetail/:petId',
    views:{
      'tab-release':{
        templateUrl:'templates/petDetail.html',
        controller:'petDetailCtrl'
      }
    }
  })
  .state('tab.addPet',{
    cache:false,
    url:'/addPet',
    views:{
      'tab-release':{
        templateUrl:'templates/addPet.html',
        controller:'addPetCtrl'
      }
    }
  })
  .state('tab.account', {
    cache:false,
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/login');

});
