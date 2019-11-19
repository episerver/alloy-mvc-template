define([
        // Dojo
        "dojo/_base/declare",
        "dojo/html",
        // Dijit
        "dijit/_TemplatedMixin",
        "dijit/_WidgetBase",
        //CMS
        "epi-cms/_ContentContextMixin"
    ], function (
        // Dojo
        declare,
        html,
        // Dijit
        _TemplatedMixin,
        _WidgetBase,
        //CMS
        _ContentContextMixin
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _ContentContextMixin], {
            // summary: A simple widget that listens to changes to the
            // current content item and puts the name in a div.

            templateString: '<div>\
                               <div data-dojo-attach-point="contentName"></div>\
                             </div>',

            postMixInProperties: function () {
                this.getCurrentContent().then(function (context) {
                    this._updateUI(context);
                }.bind(this));
            },

            contextChanged: function (context, callerData) {
                this.inherited(arguments);

                // the context changed, probably because we navigated or published something
                this._updateUI(context);
            },

            _updateUI: function (context) {
                html.set(this.contentName, context.name);
            }
        });
    }
);
