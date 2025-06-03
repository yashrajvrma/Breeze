export const exportToPdf = async (editorHtml: string) => {
  if (!editorHtml) {
    console.error("No editor HTML content to export.");
    return;
  }

  const html2pdf = await require("html2pdf.js");

  const styles = `
    .pdfStyles {
      color: black;
      background: white;
      font-family: Arial, sans-serif;
    }
    
    .pdfStyles :first-child {
      margin-top: 0;
    }
    
    .pdfStyles p {
      font-size: 1rem;
    }
    
    /* Heading styles - matching Tiptap exactly */
    .pdfStyles h1, .pdfStyles h2, .pdfStyles h3, .pdfStyles h4, .pdfStyles h5, .pdfStyles h6 {
      line-height: 1.1;
      margin-top: 2rem;
      text-wrap: pretty;
      font-weight: bold;
    }
    
    .pdfStyles h1, .pdfStyles h2 {
      margin-bottom: 1.5rem;
    }
    
    .pdfStyles h1 { 
      font-size: 2rem; 
    }
    .pdfStyles h2 { 
      font-size: 1.75rem; 
    }
    .pdfStyles h3 { 
      font-size: 1.5rem; 
    }
    .pdfStyles h4 { 
      font-size: 1.25rem; 
    }
    .pdfStyles h5 { 
      font-size: 1.2rem; 
    }
    .pdfStyles h6 { 
      font-size: 1rem; 
    }
    
    /* List styles - matching Tiptap exactly */
    .pdfStyles ul, .pdfStyles ol {
      padding: 0 1rem;
      margin: 1.25rem 1rem 1.25rem 0.4rem;
    }
    
    .pdfStyles ul li {
      list-style-type: disc;
      line-height: 1.5;
      margin-bottom: 0.25rem;
    }
    
    .pdfStyles ol li {
      list-style-type: decimal;
      line-height: 1.5;
      margin-bottom: 0.25rem;
    }
    
    .pdfStyles ul li p, .pdfStyles ol li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      line-height: inherit;
    }
    
    /* Task list specific styles - matching Tiptap */
    .pdfStyles ul[data-type="taskList"] {
      list-style: none;
      margin-left: 0;
      padding: 0;
    }
    
    .pdfStyles ul[data-type="taskList"] li {
      align-items: center;
      display: flex;
      margin-bottom: 0.5rem;
    }
    
    .pdfStyles ul[data-type="taskList"] li > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }
    
    .pdfStyles ul[data-type="taskList"] li > div {
      flex: 1 1 auto;
    }
    
    .pdfStyles ul[data-type="taskList"] input[type="checkbox"] {
      cursor: pointer;
    }
    
    /* Table styling - matching Tiptap exactly */
    .pdfStyles table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;
    }
    
    .pdfStyles td, .pdfStyles th {
      border: 1px solid rgb(0, 0, 0);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;
    }
    
    .pdfStyles td > *, .pdfStyles th > * {
      margin-bottom: 0;
    }
    
    .pdfStyles th {
      background-color: rgb(247, 247, 247);
      font-weight: bold;
      text-align: left;
    }
    
    .pdfStyles .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }
    
    
    /* Image styling - matching Tiptap exactly */
    .pdfStyles img {
      display: block;
      height: auto;
      margin: 1.5rem 0;
      max-width: 100%;
    }
    
    /* Link styles - matching Tiptap exactly */
    .pdfStyles a {
      color: #2563eb;
      cursor: pointer;
      text-decoration: none;
    }
    
    .pdfStyles a:hover {
      text-decoration: underline;
    }
  `;

  console.log("editor content is ", editorHtml);
  const wrappedHTML = `
    <div class="pdfStyles">
      <style>${styles}</style>
      ${editorHtml}
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = wrappedHTML;
  document.body.appendChild(container);

  // Wait a bit for styles to apply
  await new Promise((resolve) => setTimeout(resolve, 100));

  html2pdf()
    .from(container)
    .set({
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      },
      margin: [15, 15, 15, 15], // top, right, bottom, left
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    })
    .save()
    .then(() => {
      document.body.removeChild(container);
    });
};
