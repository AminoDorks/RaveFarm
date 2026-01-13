import { CONFIG, PATHS, SCREEN } from '../constants';
import { Handler } from '../interfaces/handler';
import { buildSelect } from '../ui/inquirer';
import { save } from '../utils/loaders';

export class SettingsHandler implements Handler {
  private __languageCallback = async () => {
    const language = await buildSelect(
      SCREEN.locale.enters.chooseLanguage,
      SCREEN.locale.choices.languages,
    );

    CONFIG.locale = language;
    SCREEN.locale = language;
    save(PATHS.config, CONFIG);
  };

  async handle(): Promise<any> {
    const setting = await buildSelect(
      SCREEN.locale.enters.chooseAction,
      SCREEN.locale.choices.settings,
    );

    switch (setting) {
      case 'changeLanguage': {
        await this.__languageCallback();
        break;
      }
    }
  }
}
