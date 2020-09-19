export const depositsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deposits.json";

export const refundsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/refunds.json";

export const servicesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services.json";

export const servicePurchasesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/service-purchases.json";

export const serviceOrdersUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/service-orders.json";

export const deliverablesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL +
  "account/orders/:pk/deliverables.json";

export const deliverableFilesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL +
  "account/deliverables/:pk/files.json";

export const deliverablesUploadUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deliverables/:pk/upload";
