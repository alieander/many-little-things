const express = require('express');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('/public'));
app.use(express.static(path.join(__dirname, 'public')));

const all_days = fs.readdirSync('./views/day/', (err, items) => items)

app.get('/', (req, res) => {
  res.render('index', {
    days: all_days
  });
});

const day = require('./routers/day');

app.use('/day', day);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(3333, () => console.log('Listening on 3333'));
