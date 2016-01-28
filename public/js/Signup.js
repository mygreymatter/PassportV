/**
 * Created by mayo on 1/27/16.
 */

(function () {
    angular.module('Signup',['Authenticator'])
        .controller('SignupController',['$scope','AuthFactory',function ($scope,AuthFactory) {
            $scope.title = "Signup";
            $scope.signup = function (user) {
                AuthFactory.signup(user);
            };
        }]);
})();