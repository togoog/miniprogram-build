///@ts-check
'use strict';
// 加载配置

var fs = require('fs');
// var minify = require('node-json-minify');
var colors = require('ansi-colors');
var log = require('fancy-log');
var json5 = require('json5');

var TITLE = colors.cyan('config:');

var DEFAULT_CONFIG_FILES = [
    'mpconfig.json',
    'mpconfig.jsonc',
    '.mpconfig.json',
    '.mpconfig.jsonc',
]

/**
 * 读取配置
 * @param {string|any} configFile
 */
function loadConfig(configFile) {
    if (configFile) {
        if (!fs.existsSync(configFile)) {
            log.error(TITLE, colors.red.underline(configFile), colors.redBright('does not exist'));
            throw new Error(configFile + 'does not exist');
        }
    }
    try {
        var json = fs.readFileSync(configFile, 'utf-8');
        var config = json5.parse(json);
        log.info(TITLE, 'load configuration from', colors.blue.underline(configFile))
        return config;
    } catch (ex) {
        log.error(TITLE, colors.red.underline(configFile), 'failed to load.', colors.redBright(ex));
        // process.exit(1);
        throw ex;
    }
}

module.exports.load = loadConfig;

module.exports.default = function () {
    // try load default configure file
    for (var index = 0; index < DEFAULT_CONFIG_FILES.length; index++) {
        if (fs.existsSync(DEFAULT_CONFIG_FILES[index])) {
            return loadConfig(DEFAULT_CONFIG_FILES[index]);
        }
    }
    return {}
}