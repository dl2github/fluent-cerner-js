import { PowerChartReturn } from '.';
import { outsideOfPowerChartError } from '../utils';

/**
 * Destroys the modal order entry window (MOEW).
 * @param {number} moewHandle - the handle to the MOEW.
 * @description The value returned by DestroyMOEW() is not used and is not believed to be meaningful, but is logged to the console for development purposes.
 * @returns a `Promise` indicating whether called from PowerChart or not.
 * @throws `Error` if an unexpected error occurs.
 */

export async function destroyMOEWAsync(
  moewHandle: number
): Promise<PowerChartReturn> {
  let retData: PowerChartReturn = {
    inPowerChart: true,
  };

  // Create the DiscernObjectFactory and use that to call DestroyMOEW() with the handle from above
  try {
    const dcof = await window.external.DiscernObjectFactory('POWERORDERS');
    const response = await dcof.DestroyMOEW(moewHandle);

    console.log('Response from DestroyMOEW() is: ', response);
  } catch (e) {
    //If outside of PowerChart, set the output to reflect that
    if (outsideOfPowerChartError(e)) {
      retData.inPowerChart = false;
    } else {
      // If some other error was encountered, throw that error
      throw e;
    }
  }

  // Return the retData object when complete
  return retData;
}
