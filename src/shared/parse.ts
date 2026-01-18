import { z, ZodType } from 'zod';

export const parse = <T extends ZodType>(data: unknown, schema: T): z.infer<T> =>
  schema.parse(data);
