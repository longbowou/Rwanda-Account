import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { orderFields } from "@/graphql/Fragments/order";

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
      }
    }
  }
  ${errorFields}
  ${orderFields}
`;
