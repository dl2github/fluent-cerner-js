# fluent-cerner-js

A modern API for interacting with the Cerner Millennium application. Modern Typescript/Javascript wrappers have been created to enhance the productivity of software engineers who are tasked with interacting with the Cerner Millennium application. This software is in it's alpha stage and should be used with caution. Additionally, it doesn't cover a full set of the Cerner Millennium application's functionality. It is a work in progress.

| Environment | CI                                                                                                                             | Publish                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Production  | ![Main Build](https://github.com/geekmdtravis/fluent-cerner-js/actions/workflows/main.yml/badge.svg?branch=main)               | ![Main Publish](https://github.com/geekmdtravis/fluent-cerner-js/actions/workflows/publish.yml/badge.svg) |
| Development | ![Development Build](https://github.com/geekmdtravis/fluent-cerner-js/actions/workflows/main.yml/badge.svg?branch=development) | Not Applicable                                                                                            |

## Contributors

- [Travis Nesbit, MD (geekmdtravis)](https://github.com/geekmdtravis/) - Primary Author
- [Daniel "Danny" Lara, MD (dl2github)](https://github.com/dl2github)

## Utility Map

| Discern                                    | _fluent-cerner-js_            | Description                                                     |
| ------------------------------------------ | ----------------------------- | --------------------------------------------------------------- |
| `APPLINK`                                  | `openOrganizeTabAsync`        | Opens a tab at the organizer level.                             |
| `APPLINK`                                  | `openPatientTabAsync`         | Opens a tab at the patient level.                               |
| `DiscernObjectFactory("PATIENTEDUCATION")` | `launchPatientEducationAsync` | Launches patient education in Cerner's PowerChart.              |
| `DiscernObjectFactory("POWERFORM")`        | `launchPowerFormAsync`        | Launch a PowerForm in Cerner's PowerChart.                      |
| `DiscernObjectFactory("POWERNOTE")`        | `launchPowerNoteAsync`        | Launch a PowerNote in Cerner's PowerChart.                      |
| `DiscernObjectFactory("POWERPLANS")`       | `submitPowerPlansAsync`       | Submits one or more powerplans to MOEW.                         |
|                                            | &rdsh; `orderString`          | Creates a valid order string, for use with `submitOrdersAsync`. |
| `DiscernObjectFactory("PVCONTXTMPAGE")`    | `getValidEncountersAsync`     | Gets an array valid encounter ID's for a given patient.         |
| `MPAGE_EVENT:CLINICALNOTE`                 | `launchClinicalNoteAsync`     | Launch a clinical note in Cerner's PowerChart.                  |
| `MPAGE_EVENT:ORDERS`                       | `submitOrdersAsync`           | Submits one or more orders to MOEW.                             |
| `XMLCclRequest`                            | `makeCclRequestAsync`         | Makes an AJAX call to a CCL end-point.                          |

## API In Action

### Create and Send Orders to MOEW

```js
const o1 = orderString('copy existing', { orderId: 12345 });

const o2 = orderString('new order', {
  newOrderOpts: {
    synonymId: 1343,
    origination: 'prescription',
  },
});

const o3 = orderString('new order', {
  newOrderOpts: {
    synonymId: 3428,
    orderSentenceId: 3,
    nomenclatureIds: [14, 15],
    interactionCheck: 'on sign',
  },
});

submitOrders(123, 456, [o1, o2, o3]);
```

### Make a CCL Request from an MPage

Using the provided tooling inside of PowerChart, making a CCL request is a complex endeavor. This library abstracts away the complexity and provides a simple interface for making CCL requests and provides an easy way to handle the response asynchronously. It returns a `Promise`.

#### Using `Promise` syntax

```ts
const opts: CclOpts = {
  prg: 'MP_GET_ORDER_LIST',
  params: [
    { type: 'number', param: 12345 },
    { type: 'string', param: 'joe' },
  ],
};

makeCclRequestAsync(opts)
  .then(data => setData(data))
  .catch(err => console.error(err))
  .finally(() => console.log("I'm done!"));
```

#### Using `async/await`

```ts
const opts: CclOpts = {
  prg: 'MP_GET_ORDER_LIST',
  params: [
    { type: 'number', param: 12345 },
    { type: 'string', param: 'joe' },
  ],
};

try {
  const data = await makeCclRequestAsync(opts);
  setData(result);
} catch (error) {
  console.error(error);
} finally {
  console.log("I'm done!");
}
```

### Launch a Clinical Note

```ts
const opts: ClinicalNoteOpts = {
  personId: 8316243,
  encounterId: 12575702,
  eventIds: [155543],
  windowTitle: 'Clinical Notes Title',
  viewOptionFlags: ['view-only'],
};

const { inPowerChart, eventString } = await launchClinicalNoteAsync(opts);
```

### Launch PowerForm

```ts
const opts: PowerFormOpts = {
  personId: 733757,
  encounterId: 701346,
  target: 'completed form',
  targetId: 15721144,
  permissions: 'modify',
};

const { inPowerChart, eventString } = await launchPowerFormAsync(opts);
```

### Launch a PowerNote

```ts
const opts: PowerNoteOpts = {
  personId: 123456,
  encounterId: 78910,
  target: 'existing',
  targetId: 1337,
};

const { inPowerChart, eventString } = await launchPowerNoteAsync(opts);
```

### Launch a Tab at the Organizer Level

Open a tab at the organizer level (no patient context). Arguments provided are _tab name_.

```ts
const { inPowerChart, eventString, badInput } = await openOrganizerTabAsync(
  'Tab Name'
);
```

### Launch a Tab at the Patient Level

Open a tab at the patient level (patient context is present). Arguments provided are _person ID_, _encounter ID_, _tab name_, and optional _boolean_ for whether or not attempt to open a _Quick Add_ tab (not available in all tabs).

```ts
const { inPowerChart, eventString, badInput } = await openPatientTabAsync(
  12345,
  51353,
  'Tab Name',
  true
);
```

### Get Valid Encounter ID's for a given patient

```ts
const { inPowerChart, encounterIds } = await getValidEncountersAsync(1);
```

## TypeScript Support

This library was developed with _TypeScript_ and all relevant types are exported.

```tsx
import { makeCclRequest, CclCallParam, CclOpts } from 'fluent-cerner-js';
import { MyCustomResponse } from '../types';
// Other imports omitted in this example for clarity

const MyComponent = ({ user }) => {
  const [data, setData] = useState<MyCustomResponse>({});

  const handleButtonClick = () => {
    const userPidParam: CclCallParam = { type: 'number', param: user.pid };

    const opts: CclOpts = {
      prg: 'MY_CUSTOM_PRG_FILENAME',
      params: [userPidParam],
    };

    makeCclRequestAsync<MyCustomResponse>(opts)
      .then(data => setData(data))
      .catch(error => addErrorToast(error));
  };

  return (
    <div>
      <h2>My Custom Component</h2>
      <p>Welcome, {user.name}</p>
      <button onClick={handleButtonClick}>Click Me to Get Data</button>
    </div>
  );
};
```
