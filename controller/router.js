const file = require('../models/file');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const sd = require('silly-datetime');


//  首页路由
exports.showIndex = function (req, res, next) {
    //node编程思维，异步函数
    file.getAllAlbums((err, albums) => {
        if(err){
            next();
            return
        }
        res.render('index', {
            'albums': albums
        });
    })
};

//  相册路由
exports.showAlbum = function (req, res, next) {
    let albumName = req.params.albumName;
    file.getImgByAlbumName(albumName, (err, imgArr) => {
        if(err){
            next();
            return
        }
        res.render('album', {
            'imgArr': imgArr,
            'albumName': albumName
        })
    })
};

//  上传
exports.showUp = function (req, res, next) {
    file.getAllAlbums((err, albums) => {
        if(err){
            next();
            return
        }
        res.render('up', {
            'albums': albums
        });
    })
};

//  上传图片
exports.postImg = function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(`${__dirname}/../tempup/`);
    form.parse(req, function(err, fields, files) {
        if(err){
            next();
            return
        }
        //判断文件尺寸是否合乎规范
        let size =  files.picture.size;
        if(size > 10 * 1024 * 1024){
            fs.unlink(files.picture.path, (err) => {
                if (err){
                    throw err;
                }
            });
            res.send('上传文件必须在10M以内');
            return
        }
        //获取时间戳
        let time = +new Date();
        // let time = sd.format(new Date(), 'YYYYMMDDHHmmss');
        //获取文件扩展名
        let extname = path.extname(files.picture.name);
        console.log(files);
        if(extname !== '.jpg' && extname !== '.png' && extname !== '.jpeg' && extname !== '.gif'){
            fs.unlink(files.picture.path, (err) => {
                if (err){
                    throw err;
                }
            });
            res.send('图片格式不正确');
            return
        }
        let oldPath = files.picture.path;
        let newPath = path.normalize(`${__dirname}/../uploads/${fields.folder}/${time}${extname}`);
        fs.rename(oldPath, newPath, (err) => {
            if(err){
                res.send('文件修改失败');
                return
            }
            res.send('成功')
        })
    });
    return
};

