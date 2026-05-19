const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  author: z.string().min(1, {
    message: "Author is required",
  }),

  publisherDate: z.string().min(1, {
    message: "Publisher date is required",
  }),

  year: z.coerce.number().min(1, {
    message: "Year is required",
  }),

  genre: z.string().min(1, {
    message: "Genre is required",
  }),

  summary: z.string().optional(),
});

module.exports = { bookSchema };
