///@ts-check
"use strict";
var gulp = require("gulp");
// var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
// const debug = require("../log/compile");
const size = require("../log/size");
var err = require("../log/error");
// var minimize = require("gulp-minimize");

var TITLE = "wxml:";
/**
 *
 * @param {object} config
 * @param {string|string[]} wxmlsrc
 */
function compress(config, wxmlsrc) {
    return (
        gulp
            .src(wxmlsrc, { base: config.src })
            // .pipe(debug({
            //     title: TITLE,
            //     // dist: config.dist,
            //     distExt: '.wxml'
            // }))
            // .pipe(
            //     // minimize({
            //     //     // spare: true
            //     //     quotes: true,
            //     //     dom: {
            //     //         xmlMode: true,
            //     //         recognizeSelfClosing: true,
            //     //     },
            //     // }),
            //     htmlmin({
            //         caseSensitive: true,
            //         collapseWhitespace: true,
            //         collapseBooleanAttributes: false,
            //         removeComments: config.release,
            //         // minifyCSS: true,
            //         keepClosingSlash: true,
            //         html5: true,
            //         // sortClassName: true,
            //         // includeAutoGeneratedTags: true,
            //         // ignoreCustomFragments: [/\{{2,}[\s\S]*?\}{2,}/],
            //         // trimCustomFragments: false
            //         customEventAttributes: [/^bind:?[a-z]+/, /^catch:?[a-z]+/, /^wx:[a-z]+/],
            //     })
            // )
            .on("error", err(TITLE))
            .pipe(rename({ extname: ".wxml" }))
            .pipe(gulp.dest(config.dist))
            .pipe(size({ title: TITLE, showFiles: true }))
    );
}

module.exports = compress;
