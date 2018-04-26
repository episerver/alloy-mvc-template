using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;

namespace AlloyTemplates.Models.Pages
{
    /// <summary>
    /// Used primarily for publishing news articles on the website
    /// </summary>
    [SiteContentType(
        GroupName = Global.GroupNames.News,
        GUID = "AEECADF2-3E89-4117-ADEB-F8D43565D2F4")]
    [SiteImageUrl(Global.StaticGraphicsFolderPath + "page-type-thumbnail-article.png")]
    public class ArticlePage : StandardPage
    {
        [Display(Description = "Name of person who wrote the article", GroupName = SystemTabNames.Content, Order = 10)]
        public virtual string Author { get; set; }

        [CultureSpecific]
        [Display(Name = "Country", Description = "Country from which this article originated", GroupName = SystemTabNames.Content, Order = 30)]
        public virtual string CountryOfOrigin { get; set; }

        [UIHint(UIHint.Textarea)]
        [Display(Name = "Summary", Description = "Short synopsis", GroupName = SystemTabNames.Content, Order = 40)]
        [CultureSpecific]
        public virtual string SummaryText { get; set; }

        [UIHint(UIHint.Image)]
        [Display(Name = "Image", Description = "Short synopsis", GroupName = SystemTabNames.Content, Order = 50)]
        [CultureSpecific]
        public virtual ContentReference SummaryImage { get; set; }
    }
}
