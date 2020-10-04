import gql from "graphql-tag";
import { purchaseFields } from "@/graphql/Fragments/purchase";
import {
  servicePurchaseChatFields,
  servicePurchaseChatMessageFields
} from "@/graphql/Fragments/service-purchase";
import { accountBasicFields } from "@/graphql/Fragments/account";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...purchaseFields
    }
  }
  ${purchaseFields}
`;

export const queryPurchaseChatMessages = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseChatFields
      service {
        account {
          ...accountBasicFields
        }
      }
    }
  }
  ${servicePurchaseChatFields}
  ${accountBasicFields}
`;

export const queryPurchaseChatFiles = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      chatFiles {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;
