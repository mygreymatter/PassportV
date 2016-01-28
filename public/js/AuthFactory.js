/**
 * Created by mayo on 1/27/16.
 */
(function () {
    angular.module('Authenticator', [])
        .factory('AuthFactory', ['$http', '$state', '$window', function ($http, $state, $window) {
            var auth = {};

            auth.message = 'messagelogin';

            auth.saveToken = function (token) {
                $window.localStorage['passport-local'] = token;
            };

            auth.getToken = function () {
                return $window.localStorage['passport-local']
            };

            auth.isLoggedIn = function () {
                var token = auth.getToken();
                console.log('Token: ' + token);

                if (!(token === undefined || token === "undefined")) {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));

                    return payload.exp > Date.now() / 1000;
                } else
                    return false;
            };

            auth.currentUser = function() {
                if (auth.isLoggedIn()) {
                    var token = auth.getToken();
                    var payload = JSON.parse($window.atob(token.split('.')[1]));

                    return payload.username;
                }
            };

            auth.login = function (user) {
                console.log("AuthFactory Login");
                return $http.post('/login', user)
                    .then(function (response) {
                        console.log("Login success: " + response);
                        auth.saveToken(response.data.token);
                        $state.go('Home');
                    }, function (error) {
                        switch(error.data.status){
                            case 112:
                                console.log('Username does not exist!');
                                auth.message = 'Username does not exist!';
                                break;
                            case 113:
                                console.log('Invalid Password!');
                                break;
                        }


                    });
            };

            auth.signup = function (user) {
                return $http.post('/signup', user)
                    .then(function (response) {
                        console.log("Signup Status: " + response.data);
                        auth.saveToken(response.data.token);
                        $state.go('Home');
                    }, function (error) {
                        console.log("Signup Failed: " + error);
                    });
            };

            auth.logout = function (user) {
                console.log('AuthFactory Logout');
                $window.localStorage.removeItem('passport-local');

                console.log('Token: '+$window.localStorage['passport-local']);
                $state.go('Login');
            };

            return auth;
        }]);
})();