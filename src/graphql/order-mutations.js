import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { orderFields } from "@/graphql/fragments/order";
import { servicePurchaseUpdateRequestOrderFields } from "@/graphql/order-queries";

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

export const acceptServicePurchaseFullFields = gql`
  mutation($input: AcceptServicePurchaseInput!) {
    acceptServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        ...orderFields
        account {
          id
          fullName
        }
      }
    }
  }
  ${errorFields}
  ${orderFields}
`;

export const refuseServicePurchase = gql`
  mutation($input: RefuseServicePurchaseInput!) {
    refuseServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        ...orderFields
        account {
          id
          fullName
        }
      }
    }
  }
  ${errorFields}
  ${orderFields}
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

export const deliverServicePurchaseFullFields = gql`
  mutation($input: DeliverServicePurchaseInput!) {
    deliverServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        ...orderFields
        account {
          id
          fullName
        }
      }
    }
  }
  ${errorFields}
  ${orderFields}
`;

export const acceptServicePurchaseUpdateRequest = gql`
  mutation($input: AcceptServicePurchaseUpdateRequestInput!) {
    acceptServicePurchaseUpdateRequest(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchaseUpdateRequest {
        ...servicePurchaseUpdateRequestOrderFields
      }
    }
  }
  ${errorFields}
  ${servicePurchaseUpdateRequestOrderFields}
`;

export const refuseServicePurchaseUpdateRequest = gql`
  mutation($input: RefuseServicePurchaseUpdateRequestInput!) {
    refuseServicePurchaseUpdateRequest(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchaseUpdateRequest {
        ...servicePurchaseUpdateRequestOrderFields
      }
    }
  }
  ${errorFields}
  ${servicePurchaseUpdateRequestOrderFields}
`;

export const deliverServicePurchaseUpdateRequest = gql`
  mutation($input: DeliverServicePurchaseUpdateRequestInput!) {
    deliverServicePurchaseUpdateRequest(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchaseUpdateRequest {
        ...servicePurchaseUpdateRequestOrderFields
      }
    }
  }
  ${errorFields}
  ${servicePurchaseUpdateRequestOrderFields}
`;
