/**
 * Created by mayo on 1/28/16.
 */
'use strict';

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var gfs = new Grid(mongoose.connection.db);

exports.create = function (req, res) {
    //console.log('Request Files: ' + req.files[0].name);

    var part = req.files[0];
    var writeStream = gfs.createWriteStream({
        filename: part.name,
        mode: 'w',
        content_type: part.mimetype
    });

    writeStream.on('close', function (file) {
        console.log('File: ' + Object.keys(file) + " _id: " + file._id);
        return res.status(200).json({
            message: 'Success',
            imageid: file._id
        });
    });

    writeStream.write(part.data);
    writeStream.end();
    //return res.status(400).json({status:'failed'});
};

exports.read = function (req, res) {
    console.log('Read Image Param: ' + req.params.filename);
    //req.params.filename = "Sit%2010%20Silence.jpg";
    gfs.files.find({
            _id: mongoose.Types.ObjectId(req.params.filename)
        })
        .toArray(function (err, files) {

            if (err)
                console.log("Error: " + err);

            if (files.length === 0)
                return res.status(400).json({
                    message: 'file not found'
                });

            res.writeHead(200, {
                'Content-Type': files[0].contentType
            });

            var readStream = gfs.createReadStream({
                filename: files[0].filename
            });

            readStream.on('data', function (data) {
                res.write(data);
            });

            readStream.on('end', function () {
                res.end();
            });

            readStream.on('error', function (err) {
                console.log('Error occured during readstream: ' + err);
                return res.status(500).json({
                    message: 'Reading error'
                });
            });

        });
};
