import z from 'zod'

export const createCategorySchema = z.object({
	name: z
		.string()
		.trim()
		.transform((val) =>
			val.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()),
		),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
