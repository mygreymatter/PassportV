/**
 * Created by mayo on 1/28/16.
 */

'use strict';

module.exports = function (app) {
    var image = require('../public/js/upload');

    app.route('/download/:filename')
        .get(image.read);


    app.route('/upload')
        .post(image.create);
};