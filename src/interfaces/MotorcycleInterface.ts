import { z } from 'zod';
import { Vehicle, vehicleInterface } from './VehicleInterface';

const MotorcycleInterface = vehicleInterface.extend({
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }) && z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'Engine capacity is required',
    invalid_type_error: 'Engine capacity must be a number',
  })
    .min(
      1,
      { message: 'Engine capacity must be greater than 0' },
    )
    .max(
      2500,
      { message: 'Engine capacity must be equal or less than 2500' },
    ),
  _id: z.optional(
    z.string({ invalid_type_error: 'Id must be a string' })
      .regex(
        /^[0-9a-fA-F]{24}$/,
        { message: 'Id must have 24 hexadecimal characters' },
      ),
  ),
});

type Motorcycle = Vehicle & z.infer<typeof MotorcycleInterface>;

export { Motorcycle, MotorcycleInterface };
