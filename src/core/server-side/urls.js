export const depositsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deposits.json";

export const refundsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/refunds.json";

export const servicesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services.json";

export const servicePurchasesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/purchases.json";

export const serviceOrdersUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/orders.json";

export const orderDeliverablesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL +
  "account/orders/:pk/deliverables.json";

export const purchaseDeliverablesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL +
  "account/purchases/:pk/deliverables.json";

export const deliverableFilesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL +
  "account/deliverables/:pk/files.json";

export const servicesOptionsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/service/:pk/options.json";

export const deliverablesUploadUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deliverables/:pk/upload";
