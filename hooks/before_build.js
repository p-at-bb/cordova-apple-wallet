/**
 * Created 19/2/2019
 * Modified 19/2/2019
 * @module to create modified appDelegate files in the xcode  project
*/

const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {

    var rootdir = "";
    var config = fs.readFileSync("config.xml").toString();
    var name = getValue(config, "name");


    function getValue(config, name) {
        var value = config.match(new RegExp('<' + name + '>(.*?)</' + name + '>', "i"))
        if (value && value[1]) {
            return value[1]
        } else {
            return null
        }
    }

    function directoryExists(path) {
        try {
            return fs.statSync(path).isDirectory();
        }
        catch (e) {
            return false;
        }
    }


    if ((directoryExists("platforms/ios"))) {
        try {
            if (ctx.opts.platforms.indexOf('ios') >= 0) {
                var srcFile_h = "platforms/ios/" + name + "/Plugins/cordova-apple-wallet/AppDelegateHeader.text";
                var destFile_h = path.join(rootdir, "platforms/ios/" + name + "/Classes/AppDelegate.h");
                var srcFile_m = "platforms/ios/" + name + "/Plugins/cordova-apple-wallet/AppDelegateImp.text";
                var destFile_m = path.join(rootdir, "platforms/ios/" + name + "/Classes/AppDelegate.m");

                setTimeout(function() {
                    fs.createReadStream(srcFile_h).pipe(fs.createWriteStream(destFile_h));
                    fs.createReadStream(srcFile_m).pipe(fs.createWriteStream(destFile_m));
                    console.log("🤭 copying delegate header file from " + srcFile_h + " to " + destFile_h);
                    console.log("🤫 copying delegate implementation file from " + srcFile_m + " to " + destFile_m);
                }, 0);
            }
        } catch (e) {
            console.log(e);
        }
    } else throw new Error("😱 Apple Wallet plugin can not find the directory 'platforms/ios', please try to add ios platform first, then build!")

};
