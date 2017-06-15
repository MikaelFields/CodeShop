'user strict';

angular.module('authApp', ['ui.router', 'rzModule', 'ngFileUpload'])
    .config(function ($provide, $urlRouterProvider, $stateProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'homeController'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile/profile.html',
                controller: 'profileController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'loginController'
            })
             .state('landing', {
                url: '/landing',
                templateUrl: 'landing/landing.html',
                controller: 'landingController'
            })
             .state('register', {
                url: '/register',
                templateUrl: 'register/register.html',
                controller: 'registerController'
            })
             .state('item', {
                url: '/item',
                templateUrl: 'item/item.html',
                controller: 'itemController'
            })
             .state('SellProducts', {
                url: '/SellProducts',
                templateUrl: 'SellProducts/SellProducts.html',
                controller: 'SellProductsController'
            });

    }).factory('socketio', ['$rootScope', function ($rootScope) {
        'use strict';
        
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);