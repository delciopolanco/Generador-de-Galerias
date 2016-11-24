(function (module, global) {
    module.Models = module.Models || {};

    module.Models.Gallery = Backbone.Model.extend({
        url: global.Server + '/examples/jquery/drag-drop-file-upload/upload.php',        

        defaults: {},

        initialize: function () {},

        parse: function (response) {
            var data;
            if (response) {
                if (response.success) {
                    data = response.data;
                } else {
                    data = response.error;
                }
            }
            return data;
        },

        sendPicture: function () {
            var self = this;
            this.save({
                success: function (model, response, options) {
                    if (response && response.success) {
                        self.trigger('successOnSave', model, response, options);
                    } else {
                        self.trigger('errorOnSave', model, response, options);
                    }
                },
                error: function (model, response, options) {
                    self.trigger('errorOnSave', model, response, options);
                }
            });
        }
    });

})(BHDLeon.module('Gallery'), BHDLeon.module('Global'));