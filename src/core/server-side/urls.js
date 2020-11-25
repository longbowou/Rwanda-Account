export const depositsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deposits.json";

export const refundsUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/refunds.json";

export const servicesUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services.json";

export const serviceUpload =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services/:pk/upload";

export const servicePreSaveUpload =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services/pre-save/upload";

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
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/services/:pk/options.json";

export const deliverablesUploadUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/deliverables/:pk/upload";

export const chatMessagesUploadUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/chat-messages/:pk/upload";

export const avatarUploadUrl =
  process.env.VUE_APP_DATATABLES_BASE_URL + "account/avatar/upload";
