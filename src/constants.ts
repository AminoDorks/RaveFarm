import { SettingsHandler } from './handlers/settings-handler';
import { StartHandler } from './handlers/start-handler';
import { Handler } from './interfaces/handler';
import { Config, ConfigSchema } from './schemas/config';
import { Screen } from './ui/screen';
import { makeIfIsnt } from './utils/loaders';

export const COLORS = {
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

export const PATHS = {
  cache: '../cache.json',
  config: '../config.json',
  proxies: '../proxies.txt',
  locales: '../locales/%s.json',
};

export const CUSTOM_THEME = {
  prefix: {
    idle: `${COLORS.red}?${COLORS.reset}`,
    done: `${COLORS.red}✔${COLORS.reset}`,
  },
  style: {
    answer: (text: string) => COLORS.red + text + COLORS.reset,
    message: (text: string) => COLORS.reset + text,
    highlight: (text: string) => COLORS.red + text + COLORS.reset,
    description: (text: string) => COLORS.red + text + COLORS.reset,
    disabled: (text: string) => COLORS.red + text + COLORS.reset,
  },
};

export const HANDLERS: Record<string, Handler> = {
  start: new StartHandler(),
  settings: new SettingsHandler(),
};

export const CONFIG: Config = makeIfIsnt<Config>(
  PATHS.config,
  {
    locale: 'en',
  },
  ConfigSchema,
);

export const SCREEN = new Screen(CONFIG.locale);
