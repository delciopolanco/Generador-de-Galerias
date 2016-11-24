this["Gallery"] = this["Gallery"] || {};
this["Gallery"]["templates"] = this["Gallery"]["templates"] || {};
this["Gallery"]["templates"]["imgRow"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"statusbar\">\r\n    <div class=\"filename\">"
    + alias4(((helper = (helper = helpers.fileName || (depth0 != null ? depth0.fileName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileName","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"filesize\">"
    + alias4(((helper = (helper = helpers.fileSize || (depth0 != null ? depth0.fileSize : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileSize","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"progressBar\">\r\n        <div style=\"width: 198px;\" class=\"progress\">0% </div>\r\n    </div>\r\n    <div class=\"abort\">Abort</div>\r\n</div>";
},"useData":true});