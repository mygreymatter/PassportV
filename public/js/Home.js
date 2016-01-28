/**
 * Created by mayo on 1/26/16.
 */
(function () {
    angular.module('Home', ['PostMan', 'Authenticator'])
        .controller('HomeController', ['$scope', '$state', 'posts', 'PostFactory', 'AuthFactory',
            function ($scope, $state, posts, PostFactory, AuthFactory) {
                $scope.title = "Home";
                $scope.posts = posts;

                $scope.addPost = function (post) {
                    console.log("Add Post: " + post.title);
                    PostFactory.createPost(post);
                };

                $scope.logout = function () {
                    AuthFactory.logout();
                };
            }]);
})();