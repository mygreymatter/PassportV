/**
 * Created by mayo on 1/27/16.
 */
(function () {
    angular.module('PostMan', [])
        .factory('PostFactory', ['$http', function ($http) {
            var o = {
                posts: []
            };

            o.getPosts = function () {
                console.log('Get Posts in PostFactory');
                return $http.get('/posts').then(function (response) {
                    console.log('Success: ' + response.data[0].title);
                    return angular.copy(response.data, o.posts);
                }, function (error) {
                    console.log('Getting posts Error: ' + error);
                });
            };

            o.createPost = function (post) {
                console.log("Create Post in Factory: " + post.title);

                return $http.post('/posts', post)
                    .then(function (response) {
                        o.posts.push(response.data);
                        console.log("Post Saved Success: " + response.data.title);
                        post.title = '';
                    }, function (error) {
                        console.log("Post Saved Failed: " + error);
                    });
            };

            return o;
        }]);
})();