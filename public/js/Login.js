/**
 * Created by mayo on 1/27/16.
 */
(function () {
    angular.module('Login', ['Authenticator'])
        .controller('LoginController', ['$scope', '$state', 'AuthFactory',
            function ($scope, $state, AuthFactory) {
                $scope.title = "Login";
                $scope.message = AuthFactory.message;

                $scope.login = function (user) {
                    AuthFactory.login(user);
                };

                $scope.signUp = function(){
                    $state.go('Signup');
                };
            }]);
})();