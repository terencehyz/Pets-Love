// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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


    /*注册*/
    .state('create-account',{
      url:'/create-account',
      templateUrl:'templates/create-account.html',
      controller: 'CreateAccountCtrl'
    })

    /*关于我们*/
    .state('tab.aboutus', {
      url: '/account/:aboutus',
      views: {
        'tab-account': {
          templateUrl: 'templates/aboutus.html',
          controller: 'aboutUsCtrl'
        }
      }
    })


    /*粉丝*/
    .state('tab.myFollower', {
      url: '/account/:myFollower',
      views: {
        'tab-account': {
          templateUrl: 'templates/myFollower.html',
          controller: 'myFollowerCtrl'
        }
      }
    })

     /*关注*/

    .state('tab.myFollowing', {
      url: '/account/:myFollowing',
      views: {
        'tab-account': {
          templateUrl: 'templates/myFollowing.html',
          controller: 'myFollowingCtrl'
        }
      }
    })



     /*宠物*/
    .state('tab.mypet', {
      url: '/account/:mypet',
      views: {
        'tab-account': {
          templateUrl: 'templates/mypet.html',
          controller: 'myPetCtrl'
        }
      }
    })

    /*宠物详情*/
    .state('myPetDetail',{
      url:'/myPetDetail',
      templateUrl:'templates/mypetdetail.html',
      controller: 'myPetDetailCtrl'
    })

    /*设置*/
    .state('tab.mysettings', {
      url: '/account/:mysettings',
      views: {
        'tab-account': {
          templateUrl: 'templates/mysettings.html',
          controller: 'MySettingsCtrl'
        }
      }
    })


    /*忘记密码*/
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

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
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
    url: '/sales',
    views: {
      'tab-sales': {
        templateUrl: 'templates/tab-sales.html',
        controller: 'SalesCtrl'
      }
    }
  })

   .state('tab.release',{
     url:'/release',
     views:{
       'tab-release':{
         templateUrl: 'templates/tab-release.html',
         controller:'ReleaseCtrl'
       }
     }
   })

  .state('tab.account', {
    cache: false,
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
