(function (module) {
    module.Views = module.Views || {};

    module.Views.Gallery = Backbone.View.extend({
        el: '#galleryContainer',

        ui: {
            inputFile: 'input[type="file"]'
        },

        bindings: {

        },

        events: {
            'click .dragandrophandler': 'showFolderSelectDialog',
            'dragenter .dragandrophandler': 'dragEnter',
            'dragover .dragandrophandler': 'dragOver',
            'drop .dragandrophandler': 'drop',
            'abort .click': 'abort'
        },

        initialize: function () {
            this.model = new module.Models.Gallery();

            this.listenTo(this.model, 'successOnSave')
        },

        render: function () {},

        handleFileUpload: function () {
            for (var i = 0; i < files.length; i++) {
                var fd = new FormData();
                fd.append('file', files[i]);

                var status = new createStatusbar(obj); //Using this we can set progress.
                status.setFileNameSize(files[i].name, files[i].size);
                this.sendFileToServer(fd, status);
            }
        },

        createStatusbar: function () {
            this.rowCount++;
            var row = 'odd';
            if (rowCount % 2 === 0) row = 'even';
            this.statusbar = $('<div class="statusbar "' + row + '></div>');
            this.filename = $('<div class="filename"></div>').appendTo(this.statusbar);
            this.size = $('<div class="filesize"></div>').appendTo(this.statusbar);
            this.progressBar = $('<div class="progressBar"><div></div></div>').appendTo(this.statusbar);
            this.abort = $('<div class="abort">Abort</div>').appendTo(this.statusbar);
            obj.after(this.statusbar);
        },

        setFileNameSize: function () {
            var sizeStr = '';
            var sizeKB = size / 1024;
            if (parseInt(sizeKB) > 1024) {
                var sizeMB = sizeKB / 1024;
                sizeStr = sizeMB.toFixed(2) + ' MB';
            } else {
                sizeStr = sizeKB.toFixed(2) + ' KB';
            }

            this.filename.html(name);
            this.size.html(sizeStr);
        },

        setProgress: function () {
            var progressBarWidth = progress * this.progressBar.width() / 100;
            this.progressBar.find('div').animate({
                width: progressBarWidth
            }, 10).html(progress + '');
            if (parseInt(progress) >= 100) {
                this.abort.hide();
            }
        },

        setAbort: function () {

        },

        sendFileToServer: function (formData, status) {
            var uploadURL = "http://hayageek.com/examples/jquery/drag-drop-file-upload/upload.php"; //Upload URL
            var extraData = {}; //Extra Data.
            var jqXHR = $.ajax({
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    if (xhrobj.upload) {
                        xhrobj.upload.addEventListener('progress', function (event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            //Set progress
                            status.setProgress(percent);
                        }, false);
                    }
                    return xhrobj;
                },
                url: uploadURL,
                type: "POST",
                contentType: false,
                processData: false,
                cache: false,
                data: formData,
                success: function (data) {
                    status.setProgress(100);

                    $("#status1").append("File upload Done<br>");
                }
            });

            status.setAbort(jqXHR);
        },

        // Event functions
        dragEnter: function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(e.currentTarget).css('border', '2px solid #0B85A1');
        },

        dragOver: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        drop: function (e) {
            $(e.currentTarget).css('border', '2px dotted #0B85A1');
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
        },

        abort: function () {
            var sb = this.statusbar;
            jqxhr.abort();
            sb.hide();

        },

        showFolderSelectDialog: function (e) {
            e.preventDefault();
            this.$(this.ui.inputFile).click();
        }
    });

})(BHDLeon.module('Gallery'));