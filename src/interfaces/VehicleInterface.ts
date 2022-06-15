import { z } from 'zod';

const IVehicleInterface = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type Vehicle = z.infer<typeof IVehicleInterface>;

export { Vehicle, IVehicleInterface };
