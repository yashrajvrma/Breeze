import { Extension } from "@tiptap/core";
import { Editor } from "@tiptap/react";

// Define types for DOCX elements
interface DocxOptions {
  filename?: string;
  download?: boolean;
  header?: string;
  footer?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    exportDocx: {
      exportToDocx: (options?: DocxOptions) => ReturnType;
    };
  }
}

interface TextRunOptions {
  text: string;
  bold?: boolean;
  italics?: boolean;
  underline?: { type: string };
  strike?: boolean;
  font?: string;
  highlight?: string;
  subScript?: boolean;
  superScript?: boolean;
  color?: string;
  size?: number;
  break?: number;
}

interface ParagraphOptions {
  children: any[];
  alignment?: string;
  spacing?: { before?: number; after?: number };
  heading?: string;
  indent?: { left?: number };
  border?: any;
  shading?: { fill: string };
  bullet?: { level: number };
  numbering?: { reference: string; level: number };
}

// Mock DOCX classes for TypeScript (you'll need to install docx package)
class TextRun {
  constructor(options: TextRunOptions) {}
}

class Paragraph {
  children: any[] = [];
  alignment?: string;
  spacing?: any;
  heading?: string;
  indent?: any;
  border?: any;
  shading?: any;
  bullet?: any;
  numbering?: any;

  constructor(options: ParagraphOptions) {
    Object.assign(this, options);
  }
}

class Document {
  constructor(options: any) {}
}

class Table {
  constructor(options: any) {}
}

class TableRow {
  constructor(options: any) {}
}

class TableCell {
  constructor(options: any) {}
}

class ExternalHyperlink {
  constructor(options: any) {}
}

class Header {
  constructor(options: any) {}
}

class Footer {
  constructor(options: any) {}
}

class Packer {
  static toBlob(doc: Document): Promise<Blob> {
    return Promise.resolve(new Blob());
  }
}

// Constants
const HeadingLevel = {
  HEADING_1: "HEADING_1",
  HEADING_2: "HEADING_2",
  HEADING_3: "HEADING_3",
  HEADING_4: "HEADING_4",
  HEADING_5: "HEADING_5",
  HEADING_6: "HEADING_6",
};

const AlignmentType = {
  LEFT: "LEFT",
  CENTER: "CENTER",
  RIGHT: "RIGHT",
  JUSTIFIED: "JUSTIFIED",
};

const UnderlineType = {
  SINGLE: "SINGLE",
};

export const DocxExporter = Extension.create({
  name: "docxExporter",

  addStorage() {
    return {
      footnotes: [] as any[],
      bookmarks: [] as any[],
      images: [] as any[],
      tables: [] as any[],
      mathEquations: [] as any[],

      exportEditorToDocx: function (
        editor: Editor,
        options: DocxOptions = {}
      ): Promise<Blob> {
        const json = editor.getJSON();
        const docxElements = this.convertJsonToDocx(json, options);

        const doc = new Document({
          sections: [
            {
              properties: {},
              children: docxElements,
              headers: options.header
                ? { default: this.createHeader(options.header) }
                : undefined,
              footers: options.footer
                ? { default: this.createFooter(options.footer) }
                : undefined,
            },
          ],
        });

        return Packer.toBlob(doc).then((blob: Blob) => {
          if (options.download !== false) {
            this.downloadBlob(blob, options.filename || "document.docx");
          }
          return blob;
        });
      },

      convertJsonToDocx: function (
        json: any,
        options: DocxOptions = {}
      ): any[] {
        const elements: any[] = [];

        if (json.content) {
          json.content.forEach((node: any) => {
            const converted = this.convertNode(node, options);
            if (converted) {
              if (Array.isArray(converted)) {
                elements.push(...converted);
              } else {
                elements.push(converted);
              }
            }
          });
        }

        return elements;
      },

      convertNode(
        node: any,
        options: DocxOptions = {},
        context: any = {}
      ): any {
        console.log("Converting node:", node.type, node);

        switch (node.type) {
          case "paragraph":
            return this.convertParagraph(node, options, context);

          case "heading":
            return this.convertHeading(node, options);

          case "text":
            return this.convertText(node, context);

          case "hardBreak":
            return new Paragraph({
              children: [new TextRun({ text: "", break: 1 })],
            });

          case "blockquote":
            return this.convertBlockquote(node, options);

          case "codeBlock":
            return this.convertCodeBlock(node, options);

          case "bulletList":
            return this.convertBulletList(node, options);

          case "orderedList":
            return this.convertOrderedList(node, options);

          case "listItem":
            return this.convertListItem(node, options, context);

          case "table":
            return this.convertTable(node, options);

          case "tableRow":
            return this.convertTableRow(node, options);

          case "tableCell":
          case "tableHeader":
            return this.convertTableCell(
              node,
              options,
              node.type === "tableHeader"
            );

          case "image":
            return this.convertImage(node, options);

          case "horizontalRule":
            return this.convertHorizontalRule();

          case "taskList":
            return this.convertTaskList(node, options);

          case "taskItem":
            return this.convertTaskItem(node, options);

          case "mention":
            return this.convertMention(node, options, context);

          case "emoji":
            return this.convertEmoji(node, context);

          case "math":
            return this.convertMath(node, options);

          case "youtube":
            return this.convertYoutube(node, options);

          case "twitter":
            return this.convertTwitter(node, options);

          default:
            if (node.content) {
              const children: any[] = [];
              node.content.forEach((child: any) => {
                const converted = this.convertNode(child, options, context);
                if (converted) {
                  if (Array.isArray(converted)) {
                    children.push(...converted);
                  } else {
                    children.push(converted);
                  }
                }
              });
              return children.length > 0 ? children : null;
            }
            return null;
        }
      },

      convertParagraph(
        node: any,
        options: DocxOptions,
        context: any = {}
      ): Paragraph {
        const children: TextRun[] = [];
        const alignment = this.getAlignment(node);

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options, {
              ...context,
              paragraph: true,
            });
            if (converted && this.isTextRun(converted)) {
              children.push(converted);
            } else if (converted && Array.isArray(converted)) {
              converted.forEach((item: any) => {
                if (this.isTextRun(item)) {
                  children.push(item);
                }
              });
            }
          });
        }

        if (children.length === 0) {
          children.push(new TextRun({ text: "" }));
        }

        return new Paragraph({
          children,
          alignment,
          spacing: { after: 200 },
        });
      },

      convertHeading(node: any, options: DocxOptions): Paragraph {
        const level = node.attrs?.level || 1;
        const children: TextRun[] = [];

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options, {
              heading: true,
            });
            if (converted && this.isTextRun(converted)) {
              children.push(converted);
            }
          });
        }

        const headingLevels: Record<number, string> = {
          1: HeadingLevel.HEADING_1,
          2: HeadingLevel.HEADING_2,
          3: HeadingLevel.HEADING_3,
          4: HeadingLevel.HEADING_4,
          5: HeadingLevel.HEADING_5,
          6: HeadingLevel.HEADING_6,
        };

        return new Paragraph({
          children,
          heading: headingLevels[level] || HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
        });
      },

      convertText(node: any, context: any = {}): TextRun | ExternalHyperlink {
        const marks = node.marks || [];
        const textRun: TextRunOptions = {
          text: node.text || "",
        };

        marks.forEach((mark: any) => {
          switch (mark.type) {
            case "bold":
              textRun.bold = true;
              break;
            case "italic":
              textRun.italics = true;
              break;
            case "underline":
              textRun.underline = { type: UnderlineType.SINGLE };
              break;
            case "strike":
              textRun.strike = true;
              break;
            case "code":
              textRun.font = "Courier New";
              textRun.highlight = "yellow";
              break;
            case "subscript":
              textRun.subScript = true;
              break;
            case "superscript":
              textRun.superScript = true;
              break;
            case "textStyle":
              if (mark.attrs?.color) {
                textRun.color = mark.attrs.color.replace("#", "");
              }
              if (mark.attrs?.fontSize) {
                textRun.size = parseInt(mark.attrs.fontSize) * 2;
              }
              break;
            case "highlight":
              textRun.highlight = mark.attrs?.color || "yellow";
              break;
            case "link":
              if (mark.attrs?.href) {
                return new ExternalHyperlink({
                  children: [new TextRun({ ...textRun })],
                  link: mark.attrs.href,
                });
              }
              break;
          }
        });

        return new TextRun(textRun);
      },

      convertBlockquote(node: any, options: DocxOptions): any[] {
        const elements: any[] = [];

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options);
            if (converted) {
              if (Array.isArray(converted)) {
                elements.push(...converted);
              } else {
                elements.push(converted);
              }
            }
          });
        }

        return elements.map((element: any) => {
          if (this.isParagraph(element)) {
            element.indent = { left: 720 };
            element.border = {
              left: { style: "single", size: 6, color: "CCCCCC" },
            };
          }
          return element;
        });
      },

      convertCodeBlock(node: any, options: DocxOptions): Paragraph {
        const text =
          node.content?.map((child: any) => child.text || "").join("") || "";
        const language = node.attrs?.language || "";

        return new Paragraph({
          children: [
            new TextRun({
              text: language ? `[${language}]\n${text}` : text,
              font: "Courier New",
              size: 20,
            }),
          ],
          shading: { fill: "F5F5F5" },
          indent: { left: 360 },
          spacing: { before: 120, after: 120 },
        });
      },

      convertBulletList(node: any, options: DocxOptions): any[] {
        const items: any[] = [];

        if (node.content) {
          node.content.forEach((item: any, index: number) => {
            const converted = this.convertNode(item, options, {
              listType: "bullet",
              level: 0,
              index,
            });
            if (converted) {
              if (Array.isArray(converted)) {
                items.push(...converted);
              } else {
                items.push(converted);
              }
            }
          });
        }

        return items;
      },

      convertOrderedList(node: any, options: DocxOptions): any[] {
        const items: any[] = [];
        const start = node.attrs?.start || 1;

        if (node.content) {
          node.content.forEach((item: any, index: number) => {
            const converted = this.convertNode(item, options, {
              listType: "numbered",
              level: 0,
              index: start + index,
            });
            if (converted) {
              if (Array.isArray(converted)) {
                items.push(...converted);
              } else {
                items.push(converted);
              }
            }
          });
        }

        return items;
      },

      convertListItem(
        node: any,
        options: DocxOptions,
        context: any = {}
      ): any[] {
        const children: any[] = [];

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options, context);
            if (converted) {
              if (Array.isArray(converted)) {
                children.push(...converted);
              } else {
                children.push(converted);
              }
            }
          });
        }

        const listParagraph = children.find((child: any) =>
          this.isParagraph(child)
        );
        if (listParagraph) {
          listParagraph.bullet =
            context.listType === "bullet"
              ? { level: context.level || 0 }
              : undefined;
          listParagraph.numbering =
            context.listType === "numbered"
              ? {
                  reference: "default-numbering",
                  level: context.level || 0,
                }
              : undefined;
        }

        return children;
      },

      convertTable(node: any, options: DocxOptions): Table {
        const rows: any[] = [];

        if (node.content) {
          node.content.forEach((row: any) => {
            const converted = this.convertNode(row, options);
            if (converted) {
              rows.push(converted);
            }
          });
        }

        return new Table({
          rows,
          width: { size: 100, type: "pct" },
        });
      },

      convertTableRow(node: any, options: DocxOptions): TableRow {
        const cells: any[] = [];

        if (node.content) {
          node.content.forEach((cell: any) => {
            const converted = this.convertNode(cell, options);
            if (converted) {
              cells.push(converted);
            }
          });
        }

        return new TableRow({ children: cells });
      },

      convertTableCell(
        node: any,
        options: DocxOptions,
        isHeader: boolean = false
      ): TableCell {
        const children: any[] = [];

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options);
            if (converted) {
              if (Array.isArray(converted)) {
                children.push(...converted);
              } else {
                children.push(converted);
              }
            }
          });
        }

        return new TableCell({
          children:
            children.length > 0
              ? children
              : [new Paragraph({ children: [new TextRun({ text: "" })] })],
          shading: isHeader ? { fill: "E0E0E0" } : undefined,
        });
      },

      convertImage(node: any, options: DocxOptions): Paragraph | null {
        const src = node.attrs?.src;
        const alt = node.attrs?.alt || "";

        if (!src) return null;

        return new Paragraph({
          children: [
            new TextRun({
              text: `[Image: ${alt || src}]`,
              italics: true,
              color: "666666",
            }),
          ],
          spacing: { before: 120, after: 120 },
        });
      },

      convertHorizontalRule(): Paragraph {
        return new Paragraph({
          children: [new TextRun({ text: "" })],
          border: { bottom: { style: "single", size: 6, color: "000000" } },
          spacing: { before: 120, after: 120 },
        });
      },

      convertTaskList(node: any, options: DocxOptions): any[] {
        const items: any[] = [];

        if (node.content) {
          node.content.forEach((item: any) => {
            const converted = this.convertNode(item, options, {
              taskList: true,
            });
            if (converted) {
              if (Array.isArray(converted)) {
                items.push(...converted);
              } else {
                items.push(converted);
              }
            }
          });
        }

        return items;
      },

      convertTaskItem(
        node: any,
        options: DocxOptions,
        context: any = {}
      ): any[] {
        const checked = node.attrs?.checked || false;
        const checkbox = checked ? "☑" : "☐";
        const children: any[] = [];

        if (node.content) {
          node.content.forEach((child: any) => {
            const converted = this.convertNode(child, options, context);
            if (converted) {
              if (Array.isArray(converted)) {
                children.push(...converted);
              } else {
                children.push(converted);
              }
            }
          });
        }

        if (children.length > 0 && this.isParagraph(children[0])) {
          children[0].children.unshift(new TextRun({ text: `${checkbox} ` }));
        }

        return children;
      },

      convertMention(node: any, options: DocxOptions, context: any): TextRun {
        const id = node.attrs?.id || "";
        const label = node.attrs?.label || id;

        return new TextRun({
          text: `@${label}`,
          color: "0066CC",
          bold: true,
        });
      },

      convertEmoji(node: any, context: any): TextRun {
        const name = node.attrs?.name || "";
        const emoji = node.attrs?.emoji || name;

        return new TextRun({
          text: emoji,
          size: 24,
        });
      },

      convertMath(node: any, options: DocxOptions): TextRun | Paragraph {
        const content = node.attrs?.content || "";

        if (node.attrs?.inline) {
          return new TextRun({
            text: `$${content}$`,
            font: "Cambria Math",
            italics: true,
          });
        }

        return new Paragraph({
          children: [
            new TextRun({
              text: `$$${content}$$`,
              font: "Cambria Math",
              italics: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 120 },
        });
      },

      convertYoutube(node: any, options: DocxOptions): Paragraph {
        const src = node.attrs?.src || "";

        return new Paragraph({
          children: [
            new TextRun({
              text: `[YouTube Video: ${src}]`,
              color: "FF0000",
              bold: true,
            }),
          ],
          spacing: { before: 120, after: 120 },
        });
      },

      convertTwitter(node: any, options: DocxOptions): Paragraph {
        const src = node.attrs?.src || "";

        return new Paragraph({
          children: [
            new TextRun({
              text: `[Twitter Embed: ${src}]`,
              color: "1DA1F2",
              bold: true,
            }),
          ],
          spacing: { before: 120, after: 120 },
        });
      },

      getAlignment(node: any): string {
        const textAlign = node.attrs?.textAlign;

        switch (textAlign) {
          case "left":
            return AlignmentType.LEFT;
          case "center":
            return AlignmentType.CENTER;
          case "right":
            return AlignmentType.RIGHT;
          case "justify":
            return AlignmentType.JUSTIFIED;
          default:
            return AlignmentType.LEFT;
        }
      },

      createHeader(content: string): Header {
        return new Header({
          children: [
            new Paragraph({
              children: [new TextRun({ text: content })],
              alignment: AlignmentType.CENTER,
            }),
          ],
        });
      },

      createFooter(content: string): Footer {
        return new Footer({
          children: [
            new Paragraph({
              children: [new TextRun({ text: content })],
              alignment: AlignmentType.CENTER,
            }),
          ],
        });
      },

      downloadBlob(blob: Blob, filename: string): void {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },

      // Helper methods for type checking
      isTextRun(obj: any): obj is TextRun {
        return obj instanceof TextRun;
      },

      isParagraph(obj: any): obj is Paragraph {
        return obj instanceof Paragraph;
      },
    };
  },

  addCommands() {
    return {
      exportToDocx:
        (options: DocxOptions = {}) =>
        ({ editor }) => {
          return this.storage.exportEditorToDocx(editor, options);
        },
    };
  },
});

export default DocxExporter;
