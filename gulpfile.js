// 先npm安装这四个包
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require('gulp')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sass = require('gulp-sass')(require('sass'))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const minifyCss = require('gulp-clean-css')
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const renameCss = require('gulp-rename')

// gulp创建任务
gulp.task('sass', function () {
	gulp.src('./packages/style/icon/*').pipe(gulp.dest('./dist/css/icon'))
	return (
		gulp
			.src('./packages/style/**/*.scss') // 编写的scss文件路径
			.pipe(sass.sync()) //将scss编译成css
			// .pipe(gulp.dest('./dist/origin/css')) //未压缩的css存放目录
			// .pipe(minifyCss()) //压缩css
			// .pipe(renameCss('all.min.css')) //重命名压缩后的css
			.pipe(gulp.dest('./dist/css'))
	)
})

gulp.task('watch-scss', function () {
	gulp.watch('*.scss', ['sass']) // 注意，任务列表是个数组，即使只有一个元素。
})
