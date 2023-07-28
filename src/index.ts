import {
  getValidEncountersAsync,
  launchClinicalNoteAsync,
  launchPowerFormAsync,
  launchPowerNoteAsync,
  makeCclRequestAsync,
  openPatientTabAsync,
  openOrganizerTabAsync,
  orderString,
  submitOrdersAsync,
  CclCallParam,
  CclOpts,
  CclRequestResponse,
  ClinicalNoteOpts,
  OrderAction,
  OrderStrOpts,
  NewOrderStrOpts,
  PowerFormOpts,
  PowerNoteOpts,
  SubmitOrderOpts,
  XmlCclStatus,
} from './functional';

export {
  getValidEncountersAsync,
  launchClinicalNoteAsync,
  launchPowerFormAsync,
  launchPowerNoteAsync,
  makeCclRequestAsync,
  openPatientTabAsync,
  openOrganizerTabAsync,
  orderString,
  submitOrdersAsync,
};

export {
  CclCallParam,
  CclOpts,
  CclRequestResponse,
  ClinicalNoteOpts,
  OrderAction,
  OrderStrOpts,
  NewOrderStrOpts,
  PowerFormOpts,
  PowerNoteOpts,
  SubmitOrderOpts,
  XmlCclStatus,
};

declare global {
  /**
   * Interface for the Cerner Windows COM Object for an XMLCclRequest.
   * Useful for development but not intended for production use. Use of
   * this method in that context requires the following meta tag in the
   * head of the HTML document: `<META content='XMLCCLREQUEST' name='discern'>`
   * [More Info](https://wiki.cerner.com/display/public/MPDEVWIKI/XMLCCLREQUEST)
   */
  interface XMLCclRequest {
    options: Object;
    readyState: number;
    responseText: string;
    status: number;
    statusText: string;
    sendFlag: boolean;
    errorFlag: boolean;
    responseBody: string;
    responseXML: string;
    async: boolean;
    requestBinding: string;
    requestText: string;
    blobIn: string;
    url: string;
    method: string;
    requestHeaders: Object;
    requestLen: number;
    onreadystatechange: () => void;
    onerror: () => void;
    abort: () => void;
    getAllResponseHeaders: () => Array<string>;
    getResponseHeader: (header: string) => string;
    open(method: string, url: string, async?: boolean): void;
    send(data: string): void;
    setRequestHeader: (name: string, value: string) => void;
  }

  /**
   * A type which ensures that only valid DiscernCOMObjects can be
   * passed to the DiscernObjectFactory constructor.
   */
  type DiscernCOMObjects =
    | 'INFOBUTTONLINK'
    | 'DISCHARGEPROCESS'
    | 'DYNDOC'
    | 'KIACROSSMAPPING'
    | 'ORDERS'
    | 'PATIENTEDUCATION'
    | 'PEXAPPLICATIONSTATUS'
    | 'PEXSCHEDULINGACTIONS'
    | 'PMLISTMAINTENANCE'
    | 'POWERFORM'
    | 'POWERNOTE'
    | 'POWERORDERS'
    | 'PREGNANCY'
    | 'PVCONTXTMPAGE'
    | 'PVFRAMEWORKLINK'
    | 'PVPATIENTFOCUS'
    | 'PVPATIENTSEARCHMPAGE'
    | 'PVVIEWERMPAGE'
    | 'TASKDOC';

  interface Window {
    /**
     * A factory function which returns a Discern COM object.
     * @param comObject {DiscernCOMObjects} - a string representing the Discern
     * COM object to be created.
     * @returns the COM object the user will interact with.
     */
    DiscernObjectFactory: (
      comObject: DiscernCOMObjects
    ) => {
      /**
       * Get valid encounter ID's for a given patient.
       * @param pid {number} - the patient ID of the patient to get encounters for.
       * @returns a `Promise` of a string representing the valid encounter ID's for the patient.
       */
      GetValidEncounters: (pid: number) => Promise<string>;
      /**
       * Provide patient context to the Discern COM object.
       * @param pid {number} - the patient ID of the patient provided for context.
       * @returns a `Promise` which always returns `null`.
       */
      SetPatient(pid: number): Promise<null>;
      /**
       * Provide patient context to the Discern COM object.
       * @param tab {0 | 1} - the tab to target upon opening. Instruction component is `0` and
       * Follow-up component is `1`.
       * @returns a `Promise` which always returns `null`.
       */
      SetDefaultTab(tab: 0 | 1): Promise<null>;
      /**
       * Open the modal for the targeted COM object.
       * @returns a `Promise` which always returns `null`.
       */
      DoModal(): Promise<null>;
    };
    /**
     * Interface for the Cerner Windows COM object for an XMLCclRequest.
     * Useful for development but not intended for production use. Use of
     * this method in that context requires the following meta tag in the
     * head of the HTML document: `<META content='XMLCCLREQUEST' name='discern'>`
     * [More Info](https://wiki.cerner.com/display/public/MPDEVWIKI/XMLCCLREQUEST)
     */
    XMLCclRequest: XMLCclRequest;
    /**
     * Interface for the Cerner Discern native function which provides the function
     * responsible for opening an application, chart tab, or organization level tab.
     * Useful for development but not intended for production use.
     * @param {0 | 1 | 100} mode - The _linkmode_ parameter for the APPLINK function.The value 0
     * is used for starting a solution by application name (e.g. Powerchart.exe), the value 1
     * is used for starting a solution by solution object (e.g. DiscernAnalytics.Application),
     * and the value 100 is used for launching a link, file, or executable through a shell execute
     * (e.g. launch a URL).
     * @param {string} target - The _launchobject_ parameter for the APPLINK function. This can
     * represent an executable name, application object, file, or link to start based on the
     * _mode_ (_linkmode_) parameter. This accepts Powerchart context variables, and using
     * `$APP_AppName$` is useful in place of the executable name if you watn to open a patient
     * in the context of the current solution.
     */
    APPLINK: (mode: 0 | 1 | 100, target: string, args: string) => void;
    /**
     * Interface for the Cerner Discern native function which provides the function
     * responsible for engaging in special Cerneer _conversation events_ within the
     * web page (MPage) with the Cerner PowerChart application. Useful for development
     * but not intended for production use.
     * @param {string} type - The type of event to be triggered. Can by `'ALLERGY' | 'POWERFORM' | 'POWERNOTE' | 'ORDERS' | 'CLINICALNOTE'`
     * @param {string} args - Argument data passed to the event, specific to the event type.
     */
    MPAGES_EVENT: (
      type: 'ALLERGY' | 'POWERFORM' | 'POWERNOTE' | 'ORDERS' | 'CLINICALNOTE',
      args: string
    ) => Promise<any>;
  }
}
