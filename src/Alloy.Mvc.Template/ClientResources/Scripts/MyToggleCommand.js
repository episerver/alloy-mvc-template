define([
    "dojo/_base/declare",
    "epi/shell/command/ToggleCommand"
], function (declare, ToggleCommand) {
    return declare([ToggleCommand], {
        name: "Test",
        label: "Click here to toggle",
        tooltip: "Click to toggle me",
        iconClass: "dijitIconNewPage", //Define your own icon css class here.
        canExecute: true,

        _execute: function () {
            alert("Label: " + this.label);
        }
    });
});
