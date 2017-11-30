const express = require('express');
const router = require('./controller/router');
const ejs = require('ejs');

let app = express();

//设置模板引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//路由中间件
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//首页
app.get('/', router.showIndex);

app.get('/:albumName', router.showAlbum);

app.get('/up', router.showUp);
app.post('/up', router.postImg);

//404页面
app.use((req, res) => {
    res.render('err');
});

app.listen(3000);