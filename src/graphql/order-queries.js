import gql from "graphql-tag";
import { orderFields } from "@/graphql/fragments/order";
import {
  servicePurchaseChatFields,
  servicePurchaseUpdateRequestFields
} from "@/graphql/fragments/service-purchase";
import { accountBasicFields } from "@/graphql/fragments/account";

export const servicePurchaseUpdateRequestOrderFields = gql`
  fragment servicePurchaseUpdateRequestOrderFields on ServicePurchaseUpdateRequestType {
    ...servicePurchaseUpdateRequestFields
    canBeAccepted
    canBeDelivered
    canBeRefused
  }
  ${servicePurchaseUpdateRequestFields}
`;

export const queryOrder = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...orderFields
      updateRequest {
        ...servicePurchaseUpdateRequestOrderFields
      }
      account {
        ...accountBasicFields
      }
    }
  }
  ${orderFields}
  ${accountBasicFields}
  ${servicePurchaseUpdateRequestOrderFields}
`;

export const queryOrderChat = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseChatFields
      account {
        ...accountBasicFields
      }
    }
  }
  ${servicePurchaseChatFields}
  ${accountBasicFields}
`;
