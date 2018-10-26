define([
    'dojo/_base/declare',
    "epi/dependency",
    "alloy/MyGlobalToolbarProvider"
], function(declare, dependency, MyGlobalToolbarProvider) {
    return declare(null, {
        initialize: function() {
            var commandregistry = dependency.resolve("epi.globalcommandregistry");
            //The first parameter is the "area" that your provider should add commands to
            //For the global toolbar the area is "epi.cms.globalToolbar"
            commandregistry.registerProvider("epi.cms.globalToolbar", new MyGlobalToolbarProvider());
        }
    });
});
