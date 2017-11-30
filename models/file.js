const fs = require('fs');

exports.getAllAlbums = function (callback) {
    fs.readdir('./uploads', (err, files) => {
        if(err){
            callback('没有找到uploads文件夹', null);
            return
        }
        let albums = [];
        (function iterator(i) {
            if(i === files.length){
                console.log(albums);
                callback(null, albums);
                return
            }
            fs.stat(`./uploads/${files[i]}`, (err, stats) => {
                if(err){
                    callback(`找不到文件夹${files[i]}`, null);
                }
                if(stats.isDirectory()){
                    albums.push(files[i]);
                }
                iterator(++i)
            })
        })(0);
    });
};

exports.getImgByAlbumName = function (albumName, callback) {
    console.log(`./uploads/${albumName}`);
    fs.readdir(`./uploads/${albumName}`, (err, files) => {
        if(err){
            callback('没有找到uploads文件', null);
            return
        }
        let imgArr = [];
        console.log(files);
        (function iterator(i) {
            if(i === files.length){
                callback(null, imgArr);
                return
            }
            fs.stat(`./uploads/${albumName}/${files[i]}`, (err, stats) => {
                if(err){
                    callback(`找不到文件夹${files[i]}`, null);
                }
                if(stats.isFile()){
                    imgArr.push(files[i]);
                }
                iterator(++i);
            })
        })(0)
    })
};