using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using AlloyTemplates.Models.Blocks;
using AlloyTemplates.Models.Pages;
using EPiServer;
using EPiServer.Core;
using EPiServer.Core.Html.StringParsing;
using EPiServer.Core.Internal;
using EPiServer.PlugIn;
using EPiServer.Scheduler;
using EPiServer.Security;
using EPiServer.ServiceLocation;

namespace AlloyTemplates.Business
{
    [ScheduledPlugIn(DisplayName = "Migrate Dynamic Content to Blocks")]
    public class MigrateDynamicContentToBlocksJob : ScheduledJobBase
    {
        private bool _stopSignaled;
        private readonly ContentAssetHelper _contentAssetHelper;
        private readonly IContentRepository _contentRepository;

        public MigrateDynamicContentToBlocksJob(ContentAssetHelper contentAssetHelper, IContentRepository contentRepository)
        {
            _contentAssetHelper = contentAssetHelper;
            _contentRepository = contentRepository;
            IsStoppable = true;
        }

        public override string Execute()
        {
            OnStatusChanged($"Starting execution of {GetType()}");

            StringWriter sw = new StringWriter();

            foreach (var contentId in GetContentToMigrate())
            {
                MigrateDynamicContent(contentId);
                sw.Write(contentId + ",");
            }

            if (_stopSignaled)
            {
                return "Stop of job was called";
            }

            return "Page Ids updated: " + sw;
        }

        public override void Stop() => _stopSignaled = true;

        private IContent CreatePageLevelBlock(int contentId, string myProperty)
        {
            var folder = _contentAssetHelper.GetOrCreateAssetFolder(new ContentReference(contentId));
            var codeSnippet = _contentRepository.GetDefault<FooBlock>(folder.ContentLink);
            codeSnippet.MyProperty = myProperty;
            (codeSnippet as IContent).Name = contentId + "_Migrated";
            _contentRepository.Publish(codeSnippet as IContent, AccessLevel.NoAccess);
            return codeSnippet as IContent;
        }

        private static IEnumerable<int> GetContentToMigrate()
        {
            var returnItems = new List<int>();
            const string query = "SELECT [fkContentID] FROM [dbo].[tblContentProperty] WHERE LongString LIKE \'%data-dynamicclass%\' ORDER BY [fkContentID]";

            using (var cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EPiServerDB"].ConnectionString))
            {
                cn.Open();

                var cmd = new SqlCommand(query, cn);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    returnItems.Add((int)reader[0]);
                }

                reader.Close();
                cn.Close();
            }

            return returnItems;
        }

        private void MigrateDynamicContent(int contentId)
        {
            var originalPage = _contentRepository.Get<ProductPage>(new ContentReference(contentId)).CreateWritableClone() as ProductPage;
            var updateXhtml = false;

            foreach (var bodyTextFragment in originalPage.MainBody.Fragments.ToArray())
            {
                if (bodyTextFragment.GetType() != typeof(DynamicContentFragment))
                {
                    continue;
                }

                // Get the original dynamic content values using the orignal DynamicContent control
                var originalDyanamicContnet = (FooDynamicContent)((DynamicContentFragment)bodyTextFragment).DynamicContent;
                var myProperty = originalDyanamicContnet.MyProperty.Value.ToString();

                var codeBlock = CreatePageLevelBlock(contentId, myProperty);
                // Update the XHTML string to embed the block and remove the dynamic content reference

                var contentFragment = ServiceLocator.Current.GetInstance<ContentFragmentFactory>()
                    .CreateContentFragment(codeBlock.ContentLink, codeBlock.ContentGuid, null);
                var originalIndex = originalPage.MainBody.Fragments.IndexOf(bodyTextFragment);
                originalPage.MainBody.Fragments.Remove(bodyTextFragment);
                originalPage.MainBody.Fragments.Insert(originalIndex, contentFragment);

                updateXhtml = true;
            }
            if (updateXhtml)
            {
                var updatedXhtmlString = originalPage.MainBody.ToInternalString();
                originalPage.MainBody = new XhtmlString(updatedXhtmlString);
                _contentRepository.Publish(originalPage, AccessLevel.NoAccess);
            }
        }
    }
}
