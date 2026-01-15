import z from 'zod';

import { ChoiceSchema } from './inquirer';

export const LocaleSchema = z.object({
  logo: z.string(),
  logoCredit: z.string(),
  enters: z.object({
    chooseAction: z.string(),
    chooseLanguage: z.string(),
    enterToken: z.string(),
    enterDeviceId: z.string(),
    enterRoomsQuantity: z.string(),
  }),
  logs: z.object({
    loggedInto: z.string(),
    roomJoined: z.string(),
  }),
  errors: z.object({
    tooManyRooms: z.string(),
    couldntJoinRoom: z.string(),
    roomError: z.string(),
  }),
  choices: z.object({
    main: z.array(ChoiceSchema),
    settings: z.array(ChoiceSchema),
    languages: z.array(ChoiceSchema),
  }),
});

export type Locale = z.infer<typeof LocaleSchema>;
