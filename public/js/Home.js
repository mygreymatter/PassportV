/**
 * Created by mayo on 1/26/16.
 */
(function () {
    angular.module('Home', ['PostMan', 'Authenticator', 'angular-filedialog'])
        .controller('HomeController', ['$scope', '$http', '$state', 'posts', 'user', 'PostFactory', 'AuthFactory', 'fileDialog',
            function ($scope, $http, $state, posts, user, PostFactory, AuthFactory, fileDialog) {


                $scope.title = user.username;
                $scope.posts = posts;
                $scope.imageid = '56ab7bec69073ef5717ceb84';

                $http.get('/user/imageid', {
                        params: {
                            username: user.username
                        }
                    })
                    .then(function (response) {
                        console.log('Got User Success: ' + response.data.imageid);
                        $scope.imageid = response.data.imageid;
                    }, function (error) {
                        console.log('Failed: ' + error);
                    });

                $scope.addPost = function (post) {
                    console.log("Add Post: " + post.title);
                    PostFactory.createPost(post);
                };

                $scope.logout = function () {
                    AuthFactory.logout();
                };

                $scope.fd = new FormData();

                $scope.updateImage = function () {
                    console.log('User ID: ' + user._id);
                    fileDialog.openFile(function (files) {
                        console.log('filedialog: ' + files);

                        var formData = new FormData();
                        angular.forEach(files, function (file, key) {
                            console.log('Key: ' + key + ", Value: " + file.name);
                            $scope.fd.append(key, file);
                        });

                        $http.post('/upload', $scope.fd, {
                                withCredentials: true,
                                headers: {
                                    'Content-Type': undefined
                                },
                                transformRequest: angular.identity
                            })
                            .then(function (response) {
                                console.log('Image Uploaded succes: ' + Object.keys(response.data));
                                var data = {
                                    user: user,
                                    image_id: response.data.imageid
                                };
                                console.log('-------------Updating Image----------------');
                                console.log('user: ' + data.user);
                                console.log('imageid: ' + data.image_id);
                                console.log('--------------------------------------------\n');
                                $http.post('/user/updateimage', data)
                                    .then(function (response) {
                                        console.log('UpdateImage Success: ' + response.data.imageid);
                                        $scope.imageid = response.data.imageid;
                                    }, function (error) {
                                        console.log('UpdateImage Failed: ' + error);
                                    });

                                //user.imageid = response.data.imageid;
                                //AuthFactory.signup(user);
                            }, function (error) {
                                console.log('Failed: ' + error);
                            });
                    });
                };
            }]);
})();
