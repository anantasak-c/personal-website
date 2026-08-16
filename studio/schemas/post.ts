import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (excerpt)",
      type: "text",
      rows: 3,
      description: "สรุปสั้นๆ ใช้แสดงในหน้ารายการบทความ",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      placeholder: "e.g. 5 min read",
    }),
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: { list: ["Build Note", "Guide", "Article"], layout: "radio" },
      initialValue: "Article",
    }),
    defineField({
      name: "language",
      title: "Content Language",
      type: "string",
      options: { list: ["TH", "EN"], layout: "radio" },
      initialValue: "TH",
    }),
    defineField({
      name: "relatedWork",
      title: "Related Work Slug",
      type: "string",
      description: "Optional canonical work slug, for example cloud-assistant",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "JSON", value: "json" },
              { title: "Python", value: "python" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Bash", value: "bash" },
              { title: "SQL", value: "sql" },
              { title: "Markdown", value: "markdown" },
            ],
            withFilename: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
  },
});
