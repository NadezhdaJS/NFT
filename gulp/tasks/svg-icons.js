export const svgIcons = () => {
  return app.gulp
    .src(app.path.src.svgIcons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG-ICONS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.svgIcons))
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.svgIcons)))
    .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.svgIcons)))
    .pipe(
      app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.svgIcons))
    )
    .pipe(app.gulp.dest(app.path.build.svgIcons))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.svgIcons))
    .pipe(app.plugins.browsersync.stream());
};
