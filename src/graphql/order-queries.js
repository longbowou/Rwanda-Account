import gql from "graphql-tag";
import { orderFields } from "@/graphql/Fragments/order";
import {
  servicePurchaseChatFields,
  servicePurchaseUpdateRequestFields
} from "@/graphql/Fragments/service-purchase";
import { accountBasicFields } from "@/graphql/Fragments/account";

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
