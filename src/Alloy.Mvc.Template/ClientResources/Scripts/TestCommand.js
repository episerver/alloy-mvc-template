define([
    "dojo/_base/declare",
    "epi/shell/command/_Command"
], function (declare, _Command) {
    return declare([_Command], {
        name: "Test",
        label: "Test command",
        tooltip: "Click to execute me",
        iconClass: "dijitIconNewPage", //Define your own icon css class here.
        canExecute: true,

        _execute: function () {
            alert("label: " + this.label);
        }
    });
});
