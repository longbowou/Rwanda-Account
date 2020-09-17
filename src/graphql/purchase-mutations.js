import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { accountFields } from "@/graphql/Fragments/account";
import { purchaseFields } from "@/graphql/Fragments/purchase";

// Buyer Mutations
export const initServicePurchase = gql`
  mutation($input: InitServicePurchaseInput!) {
    initServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;

export const cancelServicePurchase = gql`
  mutation($input: CancelServicePurchaseInput!) {
    cancelServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;

export const cancelServicePurchaseFullFields = gql`
  mutation($input: CancelServicePurchaseInput!) {
    cancelServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        ...purchaseFields
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
  ${purchaseFields}
`;

export const approveServicePurchase = gql`
  mutation($input: ApproveServicePurchaseInput!) {
    approveServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;

export const approveServicePurchaseFullFields = gql`
  mutation($input: ApproveServicePurchaseInput!) {
    approveServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        ...purchaseFields
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
  ${purchaseFields}
`;
