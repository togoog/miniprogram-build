#!/usr/bin/env node
///@ts-check
'use strict';
var loadConfig = require('../src/load-config');
var tasks = require('../src/task');
var argv = require('yargs')
    .usage('\nMiniProgram build tools <小程序编译打包工具>')
    .usage('Usage <用法>:\n  $0 [command...] [--option]')
    .example('$0 dev', '编译并监测文件变化')
    .example('$0 --config=mpconfig.json', '指定配置文件')
    .example('$0 --release --var.APP_ID=1234', '优化编译')
    .config('config', 'JSON config file <配置置文件,命令参数优先级高于配置>', loadConfig)
    // .default('config','')
    .alias('c', 'config')
    .help('help', 'show help <显示帮助信息>')
    .alias('h', 'help')
    .describe('version', 'show version number <查看本版号>')
    .epilog('2018 - 2019 by NewFuture')
    // .option('config',{
    //     describe:'config file <配置置文件,命令参数优先级高于配置>',
    // })
    .option('release', {
        describe: 'production mode <发布模式会优化压缩>',
        default: false,
        boolean: true
    })
    .option('src', {
        describe: 'source folder <源文件目录>',
        default: './src',
        type: 'string',
    })
    .option('dist', {
        describe: 'output folder <编译输出目录>',
        default: './dist',
        type: 'string',
    })
    .option('exclude', {
        describe: 'ignored files <编译忽略文件(夹)>',
        // example: 'types/**/*',
        // type:'string|array',
        array: true,
        string: true,
    })
    .option('tsconfig', {
        describe: 'typescript config file <TS配置,未设置会自动查找tsconfig.json>',
        // default: '',
        // type:'string',
    })
    .option('copy', {
        describe: 'files to copy <复制的文件>',
    })
    .option('assets', {
        describe: 'assets folder under src/ for compling style, wont put to dist <样式所需资源文件;会监测文件修改,但不会编译或复制到输出目录>',
        default: 'assets',
        type: 'string',
    })
    .option('var', {
        describe: 'KEY value pair to replace in js/json <替换JS和JSON中的变量>',
        // type: 'object',
    })
    // .showHelpOnFail(true,'--help for available options')
    // .describe({
    //     release:'release mode for publish'
    // })
    // .boolean(['release'])
    .command('dev', 'build and watch <构建和检测文件修改>')
    .command('watch', 'watch file changes <监测文件变化>')
    .command('build', 'clean and compile <清理和编译所有文件>')
    .command('clean', 'remove all files in dist <清理dist>')
    .command('compile', 'compile all source files to dist <编译所有源文件>')
    .command('js', 'compile ts/js files to `.js` <编译生成js>')
    .command('wxss', 'compile scss/sass/css/wxss to `.wxss` <编译生成wxss>')
    .command('wxml', 'compile html/wxml files to `.wxml` <编译生成wxml>')
    .command('json', 'compile all json/jsonc files to `.json` <编译生成json>')
    .command('image', 'compresse all images in source to dist <压缩所有图片>')
    .command('copy', 'copy all files match `copy` to dist <复制需要复制的文件>')
    .command('npm', 'build npm dependencies to dist <编译npm依赖>')
    .strict()
    .argv;

Object.assign(tasks.$config, argv);

// for (var key in argv) {
//     console.log(key,argv[key])
// }

if (argv._.length === 0) {
    tasks.dev(() => { });
} else {
    argv._.forEach(task => {
        tasks[task]();
    });
}