/**
 * Created by mayo on 1/26/16.
 */
(function () {
    angular.module('AngularApp', ['ui.router', 'Home', 'Login', 'Signup'])
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider',
            function ($stateProvider, $urlRouterProvider,$locationProvider) {
            $stateProvider
                .state('Home', {
                    url: '/',
                    templateUrl: '../views/home.html',
                    controller: 'HomeController',
                    resolve: {
                        posts: function (PostFactory) {
                            return PostFactory.getPosts();
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

                    }]

                }).state('Signup', {
                url: '/signup',
                templateUrl: '../views/signup.html',
                controller: 'SignupController'

            });

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
            $urlRouterProvider.otherwise('/')

        }]);
})();