import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { accountFields } from "@/graphql/Fragments/account";
import { servicePurchaseFields } from "@/graphql/Fragments/purchase";

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
        ...servicePurchaseFields
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
  ${servicePurchaseFields}
`;

export const acceptServicePurchase = gql`
  mutation($input: AcceptServicePurchaseInput!) {
    acceptServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const deliverServicePurchase = gql`
  mutation($input: DeliverServicePurchaseInput!) {
    deliverServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
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
        ...servicePurchaseFields
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
  ${servicePurchaseFields}
`;
