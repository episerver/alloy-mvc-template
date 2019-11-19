define([
        // Dojo
        "dojo/_base/declare",
        "dojo/on",
        "dojo/html",
        // Dijit
        "dijit/_TemplatedMixin",
        "dijit/_WidgetBase",
        "dijit/form/TextBox",
        //CMS
        "epi/shell/widget/dialog/Dialog",
        "epi/shell/DialogService",
        "epi-cms/_ContentContextMixin"
    ], function (
        // Dojo
        declare,
        on,
        html,
        // Dijit
        _TemplatedMixin,
        _WidgetBase,
        TextBox,
        //CMS
        Dialog,
        dialogService,
        _ContentContextMixin
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _ContentContextMixin], {
            // summary: A simple widget that listens to changes to the
            // current content item and puts the name in a div.

            templateString: '<div>\
                               <div data-dojo-attach-point="contentName"></div>\
                               <button data-dojo-attach-point="alertNode">Open alert</button>\
                               <button data-dojo-attach-point="confirmationNode">Open confirmation</button>\
                               <button data-dojo-attach-point="dialogServiceNode">Open dialog (service)</button>\
                               <button data-dojo-attach-point="dialogNode">Open dialog (explicit)</button>\
                             </div>',

            postMixInProperties: function () {
                this.getCurrentContent().then(function (context) {
                    this._updateUI(context);
                }.bind(this));
            },

            postCreate: function () {
                this.own(on(this.alertNode, "click", function () {
                    dialogService.alert({
                        title: "alert title",
                        heading: "heading",
                        content: "content",
                        description: "description",
                        iconClass: "epi-iconDownload"
                    });
                }));

                this.own(on(this.confirmationNode, "click", function () {
                    dialogService.confirmation({
                        title: "confirmation title",
                        heading: "heading",
                        content: "content",
                        description: "description",
                        iconClass: "epi-iconDownload"
                    }).then(function () {
                        alert("clicked OK");
                    }).otherwise(function () {
                        alert("clicked cancel");
                    });
                }));

                this.own(on(this.dialogServiceNode, "click", function () {
                    dialogService.dialog({
                        title: "dialog title",
                        heading: "heading",
                        content: new TextBox({label: "Text 1", _type: "field"}),
                        description: "description",
                        iconClass: "epi-iconDownload"
                    }).then(function () {
                        alert("clicked OK");
                    }).otherwise(function () {
                        alert("clicked cancel");
                    });
                }));

                this.own(on(this.dialogNode, "click", function () {
                    var dialog = new Dialog({
                        heading: "heading",
                        content: new TextBox({label: "Text 1", _type: "field"}),
                        description: "description",
                        iconClass: "epi-iconDownload"
                    });
                    dialog.on("execute", function () {
                        // run custom needed logic
                        dialog.hide();
                    });
                    dialog.show();
                }));
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
