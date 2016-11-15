/**
 * util
 * @author oldj
 * @blog http://oldj.net
 */

'use strict';

const fs = require('fs');
const app = process.type === 'browser' ? require('electron').app : require('electron').remote.app;

exports.getUserHome = function () {
    return app.getPath('home');
};

exports.isFile = function (p) {
    try {
        if (fs.statSync(p).isFile()) {
            return true;
        }
    } catch (e) {
    }
    return false;
};

exports.isDirectory = function (p) {
    try {
        if (fs.statSync(p).isDirectory()) {
            return true;
        }
    } catch (e) {
    }
    return false;
};
