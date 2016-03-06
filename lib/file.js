var fs = require('fs');


function file(path){
	var _cache = {};
	if(_cache[path]){
        return _cache[path];
    }else{
        _cache[path] = new file.prototype.init(path);
        return _cache[path];
    }
}


function wake(path){
    var files = [];
    function _wake(path){
        var tmpFiles = fs.readdirSync(path);
        tmpFiles.forEach(function(fileName){
            var tmpPath = path + '/' + fileName;
            var stat = fs.statSync(tmpPath);
            if(stat.isDirectory()){
                _wake(tmpPath);
            }else{
                stat.name = fileName;
                stat.path = tmpPath;
                stat.extension = fileName.split('.').pop().toLowerCase();
                files.push(stat);
            }
        });
    }
    _wake(path);
    return files;
}

file.prototype.init = function(path){
    this.files = wake(path);
};


/*
*  the option of options
*  minSize: Number
*  maxSize: Number
*  extension: Array of string
*  regexp: Regexp
*/
file.prototype.filter = function(options){
    var ret = [];

    if(options.minSize == undefined){
        options.minSize = Number.NEGATIVE_INFINITY;
    }
    if(options.maxSize == undefined){
        options.maxSize = Number.POSITIVE_INFINITY;
    }
    this.files.forEach(function(item){
        if( item.size < options.minSize || item.size > options.maxSize ){
            return;
        }
        if( options.extension != undefined){
            if( options.extension.indexOf(item.extension) == -1){
                return;
            }
        }
        if(options.regexp != undefined){
            if( ! options.regexp.test(item.name) ){
                return;
            }
        }
        ret.push(item);
    });
    return ret;
}

file.prototype.getSizeLargeThan = function(size){
    return this.filter({
        minSize:size,
        maxSize:2*size
    });
};

file.prototype.init.prototype = file.prototype;


module.exports = file;
