import { z } from 'zod';
import { IVehicle } from './VehicleInterface';

const ICar = IVehicle.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type Car = z.infer<typeof ICar>;

export { Car, ICar };
