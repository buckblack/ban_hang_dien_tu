var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sockIO = require("socket.io")();
var localStorage = require('localStorage')
session = require('client-sessions')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tiviRouter = require('./routes/tivi');
var chitietRouter = require('./routes/chitiet');
var dk_dnRouter = require('./routes/dangky_dangnhap');
var aboutRouter = require('./routes/about');
var errorRouter = require('./routes/error');
var giohangRouter = require('./routes/giohang');
var tulanhRouter=require('./routes/tulanh');
var maylanhRouter=require('./routes/maylanh');
var maygiatRouter=require('./routes/maygiat');
var dienthoaiRouter=require('./routes/dienthoai');
var laptopRouter=require('./routes/laptop');
var linhkienRouter=require('./routes/linhkien');
var apiRouter=require('./routes/api');
var userRouter=require('./routes/users');
var timkiemRouter=require('./routes/timkiem');
var adminRouter=require('./routes/admin');
var quantriRouter=require('./routes/quantri');


var app = express();
app.sockIO= sockIO;
sockIO.on('connection', function(socket){
  console.log(`A client connection occurred!: ${socket.id}`);
  socket.on('user-send-message', function(data){
    sockIO.sockets.emit('server-send-mesage', data);
  });
});

app.use(session({
  cookieName: 'Nguoi_dung',
  secret: '2eca38b4-28d1-11e7-93ae-92361f002671',
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  res.locals.Nguoi_dung = req.Nguoi_dung;
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false ,limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/tivi/', tiviRouter);
app.use('/chitiet/', chitietRouter);
app.use('/', dk_dnRouter);
app.use('/', aboutRouter);
app.use('/', errorRouter);
app.use('/', giohangRouter);
app.use('/tulanh/',tulanhRouter);
app.use('/maylanh',maylanhRouter);
app.use('/maygiat',maygiatRouter);
app.use('/dienthoai',dienthoaiRouter);
app.use('/laptop',laptopRouter);
app.use('/linhkien',linhkienRouter);
app.use('/users',userRouter);
app.use('/tim-kiem',timkiemRouter);
app.use('/admin',adminRouter);
app.use('/quantri',quantriRouter);
app.use('/api',apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('404', { tieude: 'Lỗi 404',trangthai:" Lỗi 404" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
