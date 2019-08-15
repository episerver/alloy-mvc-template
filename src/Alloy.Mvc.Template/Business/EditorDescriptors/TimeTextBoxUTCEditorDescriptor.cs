using EPiServer.Shell.ObjectEditing.EditorDescriptors;

namespace AlloyTemplates.Business.EditorDescriptors
{
    /// <summary>
    /// Register an editor for TimeTextBoxUTC
    /// </summary>
    [EditorDescriptorRegistration(TargetType = typeof(string), UIHint = "TimeTextBoxUTC")]
    public class TimeTextBoxUTCEditorDescriptor : EditorDescriptor
    {
        public TimeTextBoxUTCEditorDescriptor()
        {
            ClientEditingClass = "alloy/editors/TimeTextBoxUTC";
        }
    }
}
