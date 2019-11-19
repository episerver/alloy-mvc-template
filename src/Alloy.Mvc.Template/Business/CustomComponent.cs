using EPiServer.Shell.ViewComposition;

namespace AlloyTemplates.Business
{
    [Component(
        //Auto-plugs in the component to the assets panel of cms (See EPiServer.Shell.PlugInArea
        //in the EPiServer.UI assembly for Dashboard and CMS constants)
        PlugInAreas = "/episerver/cms/assets",
        Categories = "cms",
        WidgetType = "alloy/components/CustomComponent",
        //Define language path to translate Title/Description.
        //LanguagePath = "/customtranslations/components/customcomponent";
        Title = "My custom component",
        Description = "A custom component that shows information about the current content item."
    )]
    public class CustomComponent
    {
    }
}
