define([
    "dojo/_base/declare",
    "dijit/form/Button",
    "dijit/form/ToggleButton",

    "epi-cms/component/command/_GlobalToolbarCommandProvider",
    "alloy/TestCommand",
    "alloy/MyToggleCommand"
], function (declare, Button, ToggleButton, _GlobalToolbarCommandProvider, TestCommand, MyToggleCommand) {
    return declare([_GlobalToolbarCommandProvider], {
        constructor: function () {
            this.inherited(arguments);

            // The Global Toolbar has three areas that you can add commands to ["leading", "center", "trailing"]
            // the _GlobalToolbarCommandProvider extends the _CommandProviderMixin with helper methods for easy adding
            // of commands to the different areas

            //Create dijit/Form/Button in the leading area and bind the TestCommand to it
            this.addToLeading(new TestCommand({
                label: "First command"
            }), { showLabel: true, widget: Button });

            //Create dijit/Form/ToggleButton in the center area and bind the TestCommand to it
            this.addToCenter(new MyToggleCommand({
                label: "Second command"
            }), { showLabel: true, widget: ToggleButton });

            //Create dijit/Form/Button in the trailing area and bind the TestCommand to it
            this.addToTrailing(new TestCommand({
                label: "Third command"
            }), { showLabel: true, widget: Button });
        }
    });
});
