define([
    "dojo/_base/declare",
    "dojo/date/stamp",
    "dijit/form/TimeTextBox",
    "dojo/text!./TimeTextBoxTZ.html"

], function (declare, stamp, TimeTextBox, template) {

    var getOffset = function(date) {
        // summary:
        //    Returns a time zone offset based on the given date
        //
        // date: Date
        //    The date the offset should be derived from
        //
        // returns: string
        //      The time zone offset with the form of GMT+10:30

        var timeZoneOffsetRegex = new RegExp("([A-Z]+[\+-][0-9]{2})([0-9]{2})");
        var result = date.toString().match(timeZoneOffsetRegex);
        return result[1] + ":" + result[2];
    };

    return declare([TimeTextBox], {
        // summary:
        //      TimeTextBox patched with timezone offset
        //      Sets to current year instead of 1970 to fix the inconsistency of British Time.
        //      Displays timezone info to make it less confusing.

        // Override template to display timezone info
        templateString: template,

        parse: function () {
            // summary:
            //		Override the method to set the year

            var value = this.inherited(arguments);
            if (value instanceof Date) {
                value.setFullYear(new Date().getFullYear());
            }
            return value;
        },

        _setValueAttr: function (value, priorityChange, formattedValue) {
            // summary:
            //		Override the method to set the year. Note: value can be a JavaScript Date literal or a string to be parsed.

            // The value is a string when loading from server. In this case do not modify the year.
            // Thus the year and timezone offset remains, until it is modified from UI.
            if (value instanceof Date && !this._isInvalidDate(value)) {
                value.setFullYear(new Date().getFullYear());
            }
            this._renderTimeZoneText(value);
            this.inherited(arguments);
        },

        _renderTimeZoneText: function (value) {
            // summary:
            //		Display timeZone info. Note: value can be a JavaScript Date literal or a string to be parsed.

            if (typeof value == "string") {
                value = stamp.fromISOString(value);
            }
            if (value instanceof Date && !this._isInvalidDate(value)) {
                var timeZoneOffset = getOffset(value);
                this.timeZone.innerText = "(" + timeZoneOffset + ")";
            }
        }
    });
});
