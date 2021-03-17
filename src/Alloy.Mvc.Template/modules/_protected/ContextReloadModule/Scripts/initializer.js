define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/when",
    "epi/_Module",
    "epi/shell/postMessage",
    "epi-cms/_ContentContextMixin"
], function (
    declare,
    topic,
    when,
    _Module,
    postMessage,
    _ContentContextMixin
) {
    // prefix added to main iframe, all iframe topics are published with 'sitePreview'
    var topicPrefix = "sitePreview";

    return declare([_Module, _ContentContextMixin], {
        initialize: function () {
            this.inherited(arguments);

            postMessage.subscribe(topicPrefix + "custom-reload-module/reload-page",
                function() {
                    if (confirm("Editing content changed. Do you want to reload editing context?")) {

                        // get current Edit Mode content context
                        when(this.getCurrentContext()).then(function (currentContext) {

                            // call force refresh to reload current context
                            topic.publish("/epi/shell/context/request", { uri: currentContext.uri }, {
                                forceContextChange: true
                            });
                        });
                    }
                }.bind(this));
        }
    });
});
