/**
 * Created by mayo on 1/27/16.
 */

(function () {
    angular.module('Signup',['Authenticator'])
        .controller('SignupController',['$scope','$http','AuthFactory',function ($scope,$http,AuthFactory) {
            console.log('SignupController');
            $scope.title = "Signup";
            $scope.fd = new FormData();

            $scope.signup = function (user) {
                console.log('Register USer: '+user);

                $http.post('/upload',$scope.fd,{
                        withCredentials: true,
                        headers: {'Content-Type': undefined },
                        transformRequest: angular.identity
                })
                    .then(function (response) {
                        console.log('Image Uploaded: '+ response);
                        user.imageid = response.data.imageid;
                        AuthFactory.signup(user);
                    }, function (error) {
                        console.log('Failed: ' + error);
                    });

            };

            $scope.file = null;

            $scope.$watch('file', function (files) {
                if (files){
                    console.log('Files: ' + files.length);
                    angular.forEach(files, function (file, key) {
                        console.log('Key: ' + key + ", Value: " + file.name);
                        $scope.fd.append('file', file);
                        console.log('Fd: ' + $scope.fd);
                    });
                }

            })

            /*$scope.uploadedFile = function(element) {
                $scope.$apply(function($scope) {
                    angular.forEach(element.files, function (value, key) {
                        console.log('Key: ' + key + ", Value: " + value);
                        $scope.fd.append('filename', value);
                        console.log('Fd: ' + $scope.fd);
                    });
                    /!*$scope.files = element.files;
                    fd.append('file')
                    console.log("Files: " + $scope.files.length);*!/
                });
            }*/
        }]);
})();