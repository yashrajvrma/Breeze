// app/api/export-docx/route.ts

import { NextRequest, NextResponse } from "next/server";
import htmlToDocx from "html-to-docx";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { htmlContent, leftMargin = 96, rightMargin = 96 } = body;

  if (!htmlContent) {
    return NextResponse.json(
      { error: "Missing HTML content" },
      { status: 400 }
    );
  }

  const styles = `
    .pdfStyles {
      color: black;
      background: white;
      font-family: Arial, sans-serif;
      max-width: 816px;
      width: 100%;
      margin: 0 auto;
      padding-left: ${leftMargin}px;
      padding-right: ${rightMargin}px;
    }

    .pdfStyles :first-child {
      margin-top: 0;
    }

    .pdfStyles p {
      font-size: 1rem;
    }

    .pdfStyles h1, .pdfStyles h2, .pdfStyles h3, .pdfStyles h4, .pdfStyles h5, .pdfStyles h6 {
      line-height: 1.1;
      margin-top: 2rem;
      font-weight: bold;
    }

    .pdfStyles h1, .pdfStyles h2 {
      margin-bottom: 1.5rem;
    }

    .pdfStyles h1 { font-size: 2rem; }
    .pdfStyles h2 { font-size: 1.75rem; }
    .pdfStyles h3 { font-size: 1.5rem; }
    .pdfStyles h4 { font-size: 1.25rem; }
    .pdfStyles h5 { font-size: 1.2rem; }
    .pdfStyles h6 { font-size: 1rem; }

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
      vertical-align: top;
    }

    .pdfStyles th {
      background-color: rgb(247, 247, 247);
      font-weight: bold;
      text-align: left;
    }

    .pdfStyles img {
      display: block;
      height: auto;
      margin: 1.5rem 0;
      max-width: 100%;
    }

    .pdfStyles a {
      color: #2563eb;
      cursor: pointer;
      text-decoration: none;
    }

    .pdfStyles a:hover {
      text-decoration: underline;
    }
  `;

  const wrappedHTML = `
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        <div class="pdfStyles">
          ${htmlContent}
        </div>
      </body>
    </html>
  `;

  const docxBuffer = await htmlToDocx(wrappedHTML, null, {
    orientation: "portrait",
    margins: {
      gutter: 0,
      header: 720,
      footer: 720,
      top: 720,
      bottom: 720,
      left: (leftMargin / 96) * 1440,
      right: (rightMargin / 96) * 1440,
    },
  });

  return new NextResponse(docxBuffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=document.docx",
    },
  });
}
