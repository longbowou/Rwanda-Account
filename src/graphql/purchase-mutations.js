import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { accountFields } from "@/graphql/fragments/account";
import { purchaseFields } from "@/graphql/fragments/purchase";
import {
  litigationFields,
  servicePurchaseUpdateRequestFields
} from "@/graphql/fragments/service-purchase";

// Buyer Mutations
export const initiateServicePurchase = gql`
  mutation($input: InitiateServicePurchaseInput!) {
    initiateServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        id
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
  ${purchaseFields}
  ${accountFields}
`;

export const initiateServicePurchaseUpdateRequest = gql`
  mutation($input: InitiateServicePurchaseUpdateRequestInput!) {
    initiateServicePurchaseUpdateRequest(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchaseUpdateRequest {
        ...servicePurchaseUpdateRequestFields
      }
    }
  }
  ${errorFields}
  ${servicePurchaseUpdateRequestFields}
`;

export const createLitigation = gql`
  mutation($input: CreateLitigationInput!) {
    createLitigation(input: $input) {
      errors {
        ...errorFields
      }
      litigation {
        ...litigationFields
      }
    }
  }
  ${errorFields}
  ${litigationFields}
`;

export const createServiceComment = gql`
  mutation($input: CreateServiceCommentInput!) {
    createServiceComment(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
