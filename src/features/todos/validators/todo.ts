import z from 'zod'

export const TodoSchema = z.object({
  title: z.string().nonempty('Required'),
  done: z.boolean().default(false),
})

export type TodoInputType = z.infer<typeof TodoSchema>
