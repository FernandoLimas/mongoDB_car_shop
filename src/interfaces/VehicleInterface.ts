import { z } from 'zod';

const vehicleInterface = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .min(
      1900,
      { message: 'Year must be equal or greater than 1900' },
    )
    .max(
      2022,
      { message: 'Year must be equal or less than 2022' },
    ),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.optional(z.boolean({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a boolean',
  })),
  buyValue: z.number({
    required_error: 'Buy value is required',
    invalid_type_error: 'Buy value must be a number',
  }).int({
    message: 'Buy value must be an integer',
  }),
});
type Vehicle = z.infer<typeof vehicleInterface>;

export { Vehicle, vehicleInterface };