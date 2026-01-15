import { Rave } from 'ravejs';
import { Handler } from '../interfaces/handler';
import { buildInput, numericFilter } from '../ui/inquirer';
import { SCREEN } from '../constants';
import { display } from '../ui/screen';
import { Mesh } from 'ravejs/dist/schemas';

export class StartHandler implements Handler {
  private __getMeshes = async (rave: Rave): Promise<Mesh[]> => {
    const result = await rave.mesh.getMany({
      limit: parseInt(
        await buildInput(SCREEN.locale.enters.enterRoomsQuantity, {
          filter: numericFilter,
        }),
      ),
      isPublic: true,
    });

    if (!result?.data) {
      display(SCREEN.locale.errors.tooManyRooms);
      return await this.__getMeshes(rave);
    }

    return result.data.flatMap((mesh) => mesh.mesh);
  };

  async handle(): Promise<any> {
    const rave = new Rave({ enableLogging: true });

    await rave.auth.authenticate(
      await buildInput(SCREEN.locale.enters.enterToken),
      await buildInput(SCREEN.locale.enters.enterDeviceId),
    );
    display(
      SCREEN.locale.logs.loggedInto.replace('%s', rave.account.displayName!),
    );
  }
}
