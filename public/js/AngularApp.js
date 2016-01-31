/**
 * Created by mayo on 1/26/16.
 */
(function () {
    angular.module('AngularApp', ['ui.router', 'Home', 'Login', 'Signup'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $stateProvider
                    .state('Home', {
                        url: '/',
                        templateUrl: '../views/home.html',
                        controller: 'HomeController',
                        resolve: {
                            posts: function (PostFactory) {
                                return PostFactory.getPosts();
                            },
                            user: function (AuthFactory) {
                                return AuthFactory.currentUser();
                            }
                        },
                        onEnter: ['$state', 'AuthFactory', function ($state, AuthFactory) {
                            if (!AuthFactory.isLoggedIn()) {
                                $state.go('Login');
                            }
                        }]
                    })
                    .state('Login', {
                        url: '/login',
                        templateUrl: '../views/login.html',
                        controller: 'LoginController',
                        onEnter: ['$state', 'AuthFactory', function ($state, AuthFactory) {
                            if (AuthFactory.isLoggedIn()) {
                                $state.go('Home');
                            }
                        }]
                    })
                    .state('Signup', {
                        url: '/signup',
                        templateUrl: '../views/signup.html',
                        controller: 'SignupController',
                        onEnter: ['$state', 'AuthFactory', function ($state, AuthFactory) {
                            if (AuthFactory.isLoggedIn()) {
                                $state.go('Home');
                            }
                        }]
                    });

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
                $urlRouterProvider.otherwise('/')

            }]).directive('imageonload', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs, showImage) {
                    element.bind('load', function () {
                        console.log('image is loaded: ' + Object.keys(attrs));
                        console.log(element[0]);
                        console.log(showImage);
                        //loadImage()
                        EXIF.getData(this, function () {
                            var make = EXIF.getTag(this, "Make"),
                                model = EXIF.getTag(this, "Model"),
                                orientation = EXIF.getTag(this, "Orientation");
                            //alert("I was taken by a " + make + " ,model:" + model + ' ,ori: ' + orientation);
                            console.log('Make: ' + make + " ;Model: " + model + ' ;Orientation: ' + orientation);
                            if (orientation == 6) {
                                element.removeClass('noDisplay');
                                element.addClass('rotate90')

                            }
                        });


                    });
                    element.bind('error', function () {
                        alert('image could not be loaded');
                    });
                }
            };
        });
})();
