/**
 * Created by mayo on 1/27/16.
 */

(function () {
    angular.module('Signup', ['Authenticator'])
        .controller('SignupController', ['$scope', '$http', 'AuthFactory', function ($scope, $http, AuthFactory) {
            console.log('SignupController');
            $scope.title = "Signup";

            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };

            $scope.signup = function (user) {
                console.log('Register User: ' + user);
                $http.post('/upload', formdata, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (response) {
                    console.log('Image Uploaded: ' + response);
                    user.imageid = response.data.imageid;
                    AuthFactory.signup(user);
                }, function (error) {
                    console.log('Failed: ' + error);
                });

            };

        }]).directive('ngFiles', ['$parse', function ($parse) {
            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, {
                        $files: event.target.files
                    });
                });
            };

            return {
                link: fn_link
            }
            }]);
})();
