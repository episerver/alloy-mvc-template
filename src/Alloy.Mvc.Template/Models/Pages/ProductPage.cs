using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AlloyTemplates.Models.Blocks;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using AlloyTemplates.Models.Properties;
using EPiServer.Shell.ObjectEditing;

namespace AlloyTemplates.Models.Pages
{
    /// <summary>
    /// Used to present a single product
    /// </summary>
    [SiteContentType(
        GUID = "17583DCD-3C11-49DD-A66D-0DEF0DD601FC",
        GroupName = Global.GroupNames.Products)]
    [SiteImageUrl(Global.StaticGraphicsFolderPath + "page-type-thumbnail-product.png")]
    [AvailableContentTypes(
        Availability = Availability.Specific,
        IncludeOn = new[] { typeof(StartPage) })]
    public class ProductPage : StandardPage, IHasRelatedContent
    {
        [Required]
        [Display(Order = 305)]
        [UIHint(Global.SiteUIHints.StringsCollection)]
        [CultureSpecific]
        public virtual IList<string> UniqueSellingPoints { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 330)]
        [CultureSpecific]
        [AllowedTypes(new[] { typeof(IContentData) },new[] { typeof(JumbotronBlock) })]
        public virtual ContentArea RelatedContentArea { get; set; }
        
        [Display(Name = "Original TimeTextBox", GroupName = SystemTabNames.Content, Order = 100)]
        [ClientEditor(ClientEditingClass = "dijit/form/TimeTextBox")]
        public virtual string TimeTextBox { get; set; }

        [Display(Name = "TimeTextBoxTZ", GroupName = SystemTabNames.Content, Order = 110)]
        [ClientEditor(ClientEditingClass = "alloy/editors/TimeTextBoxTZ")]
        public virtual string TimeTextBoxTZ { get; set; }

        [Display(Name = "TimeTextBoxUTC", GroupName = SystemTabNames.Content, Order = 120)]
        [UIHint("TimeTextBoxUTC")]
        public virtual string TimeTextBoxUTC { get; set; }
    }
}
