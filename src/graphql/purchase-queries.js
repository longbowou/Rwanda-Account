import gql from "graphql-tag";
import { purchaseFields } from "@/graphql/Fragments/purchase";
import { servicePurchaseChatFields } from "@/graphql/Fragments/service-purchase";
import { accountBasicFields } from "@/graphql/Fragments/account";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...purchaseFields
    }
  }
  ${purchaseFields}
`;

export const queryPurchaseChat = gql`
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
