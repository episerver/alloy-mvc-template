using System.IO;
using EPiServer.Core;
using EPiServer.DynamicContent;

namespace AlloyTemplates.Business
{
    [DynamicContentPlugIn(DisplayName = "Foo Dynamic Content")]
    public class FooDynamicContent : DynamicContentBase, IDynamicContentView
    {
        public PropertyString MyProperty { get; set; }

        public FooDynamicContent()
        {
            MyProperty = new PropertyString();
            Properties = new PropertyDataCollection { { "MyProperty", MyProperty } };
        }

        public void Render(TextWriter writer)
        {
            if (MyProperty != null && MyProperty.Value != null)
            {
                writer.Write("<p>" + MyProperty.Value + "</p>");
            }
        }
    }
}
