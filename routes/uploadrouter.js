/**
 * Created by mayo on 1/28/16.
 */

'use strict';

module.exports = function (app) {
    var upload = require('../public/js/upload');

    app.route('/download/:filename')
        .get(upload.read);


    app.route('/upload')
        .post( upload.create);
};
