define([
    "dojo/_base/lang",
    "dijit/_TimePicker",
    "dojo/_base/array",
    "dojo/date", // date.compare
    "dojo/date/locale", // locale.format
    "dojo/date/stamp", // stamp.fromISOString stamp.toISOString
    "dojo/_base/declare", // declare
    "dojo/dom-class", // domClass.add domClass.contains domClass.toggle
    "dojo/dom-construct" // domConstruct.create
], function (lang, _TimePicker, array, ddate, locale, stamp, declare, domClass, domConstruct) {

    return declare([_TimePicker], {
        // summary:
        //      Patch TimePicker to display UTC time

        _createOption: function (/*Number*/ index) {
            // summary:
            //		Patch the method to create time option in UTC

            var date = new Date(this._refDate);
            var incrementDate = this._clickableIncrementDate;
            date.setTime(date.getTime()
                + incrementDate.getHours() * index * 3600000
                + incrementDate.getMinutes() * index * 60000
                + incrementDate.getSeconds() * index * 1000);

            /*------PATCH START------*/

            if (this.constraints.selector == "time") {
                date.setUTCFullYear(1970,0,1); // make sure each time is for the same UTC date
            }
            // show UTC time on the options
            var utcOffsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
            var dateString = locale.format(utcOffsetDate, this.constraints);

            /*------PATCH END------*/

            if (this.filterString && dateString.toLowerCase().indexOf(this.filterString) !== 0) {
                // Doesn't match the filter - return null
                return null;
            }

            var div = this.ownerDocument.createElement("div");
            div.className = this.baseClass + "Item";
            div.date = date;
            div.idx = index;
            domConstruct.create("div",{
                "class": this.baseClass + "ItemInner",
                innerHTML: dateString
            }, div);

            if (index % this._visibleIncrement < 1 && index % this._visibleIncrement > -1) {
                domClass.add(div, this.baseClass + "Marker");
            } else if (!(index % this._clickableIncrement)) {
                domClass.add(div, this.baseClass + "Tick");
            }

            if (this.isDisabledDate(date)) {
                // set disabled
                domClass.add(div, this.baseClass + "ItemDisabled");
            }
            if (this.value && !ddate.compare(this.value, date, this.constraints.selector)) {
                div.selected = true;
                domClass.add(div, this.baseClass + "ItemSelected");
                if (domClass.contains(div, this.baseClass + "Marker")) {
                    domClass.add(div, this.baseClass + "MarkerSelected");
                } else {
                    domClass.add(div, this.baseClass + "TickSelected");
                }

                // Initially highlight the current value.   User can change highlight by up/down arrow keys
                // or mouse movement.
                this._highlightOption(div, true);
            }
            return div;
        }

    });
});
