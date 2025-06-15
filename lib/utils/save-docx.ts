type UpdatedMessageResponse = {
  originalContent: string;
  updatedDocHtml: string;
};
export const updateMessageResponse = ({
  originalContent,
  updatedDocHtml,
}: UpdatedMessageResponse) => {
  const startTag = "<doc>";
  const endTag = "</doc>";

  const startIdx = originalContent.indexOf(startTag);
  const endIdx = originalContent.indexOf(endTag);

  if (startIdx === -1 || endIdx === -1) {
    console.warn("Document tags not found in message content.");
    return originalContent;
  }

  const before = originalContent.slice(0, startIdx + startTag.length).trim();
  const after = originalContent.slice(endIdx).trim(); // includes <<end-doc>> and after text

  console.log("updated content is", `${before}${updatedDocHtml}${after}`);

  return `${before}${updatedDocHtml}${after}`;
};
