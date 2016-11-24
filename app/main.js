var BHDLeon = new function() {
    var _modules = [];

    // retrieve or initialize a module
    this.module = function(key) {
        if (!_modules[key]) {
            _modules[key] = {};
        }
        return _modules[key];
    };

    var global = this.module('Global');

    global.Server = 'http://hayageek.com';
    global.Module = '';
    global.Mixins = {};
    global.Events = {};

    _.extend(global.Events, Backbone.Events);
};