using System.ComponentModel.DataAnnotations;
using EPiServer.DataAbstraction;

namespace AlloyTemplates.Models.Blocks
{
    [SiteContentType(GUID = "111CF12F-1F01-4EA0-922F-0778314DDAF0")]
    public class FooBlock : SiteBlockData
    {
        [Display(Order = 1, GroupName = SystemTabNames.Content)]
        public virtual string MyProperty { get; set; }
    }
}
