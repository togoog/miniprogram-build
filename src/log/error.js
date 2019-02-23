///@ts-check
"use strict";
var log = require("fancy-log");
var colors = require("colors");

/**
 * @param {string} TITLE
 */
module.exports = function(TITLE) {
    return function(err) {
        log.error(
            colors.cyan("<ERROR>" + TITLE),
            colors.red(err.name),
            "\n",
            colors.bgRed(err.message),
            "\n",
            colors.red.underline(err.relativePath || err.fileName),
            "\n",
        );
        if (process.env.SKIP_ERROR) {
            return this.emit("end", err);
        } else {
            process.exit(1);
        }
    };
};
