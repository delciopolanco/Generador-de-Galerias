 var config = {
     app: 'app',
     dest: 'deploy',
 };

 //Origin
 config.css = config.app + '/css/';
 config.js = config.app + '/js/';
 config.templates = config.app + '/templates/templates';
 config.partials = config.app + '/templates/partials';

 //Destination

  config.templatesDest = config.app + '/templates/';

  exports.config = config;