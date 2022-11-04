import {
  launchPowerForm,
  PowerFormOpts,
} from '../../src/utils/launchPowerForm';

describe('launchPowerForm', () => {
  it('properly constructs a valid power form request', () => {
    const expected = '733757|701346|15721144|0|0';
    const opts: PowerFormOpts = {
      personId: 733757,
      encounterId: 701346,
      target: 'form',
      targetId: 15721144,
      permissions: 'modify',
    };

    const result = launchPowerForm(opts);
    expect(result).toEqual(expected);
  });

  it('properly checks for the targetID parameter when set to form or activity and throws error if not present', () => {
    const opts: PowerFormOpts = {
      personId: 733757,
      encounterId: 701346,
      target: 'form',
      targetId: undefined,
      permissions: 'modify',
    };

    expect(() => launchPowerForm(opts)).toThrow(Error);
  });
});
