/**
 * Created by jun on 2016/11/27.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

var gulp=require('gulp')
var electronPacker = require("gulp-electron-packer");
var packageJSON = require('./package.json');

gulp.src("./src/*.ext")
    .pipe(electronPacker(packageJSON))
    .pipe(gulp.dest("./dist"));
