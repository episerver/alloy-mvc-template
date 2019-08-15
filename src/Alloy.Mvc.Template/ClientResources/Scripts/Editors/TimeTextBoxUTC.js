define([
    "dojo/_base/declare",
    "dojo/date/locale", // locale.format
    "dojo/date/stamp", // stamp.fromISOString stamp.toISOString
    "dijit/form/TimeTextBox",
    "./TimePickerUTC"

], function (declare, locale, stamp, TimeTextBox, TimePickerUTC) {

    return declare([TimeTextBox], {
        // summary:
        //      TimeTextBox in UTC time

        // with patched time picker
        popupClass: TimePickerUTC,

        parse: function () {
            // summary:
            //		Override the method to parse the string as UTC time

            // the value is parsed as local time
            var value = this.inherited(arguments);

            // calculate UTC time
            if (value instanceof Date) {
                value = new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000);
            }
            return value;
        },

        _setValueAttr: function (value, priorityChange, formattedValue) {
            // summary:
            //		Override the method to set UTC time. Note: value can be a JavaScript Date literal or a string to be parsed.

            if (typeof value == "string") {
                value = stamp.fromISOString(value);
            }
            if (value instanceof Date && !this._isInvalidDate(value)) {
                // set UTC time string as formattedValue, which is shown in the textBox
                var utcOffsetDate = new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000);
                arguments[2] = locale.format(utcOffsetDate, this.constraints);
                arguments.length = 3;
            }
            this.inherited(arguments);
        }
    });
});
