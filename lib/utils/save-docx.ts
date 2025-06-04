type UpdatedMessageResponse = {
  originalContent: string;
  updatedDocJson: object;
};
export const updateMessageResponse = ({
  originalContent,
  updatedDocJson,
}: UpdatedMessageResponse) => {
  const startTag = "<<start-doc>>";
  const endTag = "<<end-doc>>";

  const startIdx = originalContent.indexOf(startTag);
  const endIdx = originalContent.indexOf(endTag);

  if (startIdx === -1 || endIdx === -1) {
    console.warn("Document tags not found in message content.");
    return originalContent;
  }

  const before = originalContent.slice(0, startIdx + startTag.length).trim();
  const after = originalContent.slice(endIdx).trim(); // includes <<end-doc>> and after text

  return `${before}\n${JSON.stringify(updatedDocJson, null, 2)}\n${after}`;
};
