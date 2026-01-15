import { Rave } from 'ravejs';

import { Handler } from '../interfaces/handler';
import { buildInput, numericFilter } from '../ui/inquirer';
import { SCREEN } from '../constants';
import { display, meshLog } from '../ui/screen';
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
    const rave = new Rave();

    await rave.auth.authenticate(
      await buildInput(SCREEN.locale.enters.enterToken),
      await buildInput(SCREEN.locale.enters.enterDeviceId),
    );
    display(
      SCREEN.locale.logs.loggedInto.replace('%s', rave.account.displayName!),
    );

    const promises = (await this.__getMeshes(rave)).map(async (mesh) => {
      try {
        const meshSocket = await rave.mesh.join(mesh.id);
        await new Promise<void>((resolve, reject) => {
          meshSocket.onopen(() => {
            meshLog(SCREEN.locale.logs.roomJoined, mesh);
            resolve();
          });

          meshSocket.onerror(async () => {
            meshLog(SCREEN.locale.errors.roomError, mesh);
            reject();
          });
        });
      } catch {
        meshLog(SCREEN.locale.errors.couldntJoinRoom, mesh);
      }
    });

    await Promise.all(promises);
    await new Promise(() => {});
  }
}
