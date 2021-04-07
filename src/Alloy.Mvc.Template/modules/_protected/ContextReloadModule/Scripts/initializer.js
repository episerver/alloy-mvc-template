define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/when",
    "epi/_Module",
    "epi/dependency",
    "epi/shell/postMessage",
    "epi-cms/_ContentContextMixin"
], function (
    declare,
    topic,
    when,
    _Module,
    dependency,
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

                        /*
                        // example of reload with latest content version
                        // this will work only for Episerver.CMS.UI 11.32 and above
                        when(this.getCurrentContext()).then(function (currentContext) {
                            this.latestContentVersionStore = this.latestContentVersionStore || dependency.resolve("epi.storeregistry")
                                .get("epi.cms.latestcontentversion");

                            this.latestContentVersionStore.query({ id: currentContext.id, keepVersion: true }).then(
                                function(latestContent) {
                                    // call force refresh to reload current context
                                    topic.publish("/epi/shell/context/request", { uri: latestContent.uri }, {
                                        forceContextChange: true
                                    });
                                });
                        }.bind(this));
                        */
                    }
                }.bind(this));
        }
    });
});
