import gql from "graphql-tag";
import { orderFields } from "@/graphql/Fragments/order";
import { servicePurchaseChatFields } from "@/graphql/Fragments/service-purchase";
import { accountBasicFields } from "@/graphql/Fragments/account";

export const queryOrder = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...orderFields
      account {
        ...accountBasicFields
      }
    }
  }
  ${orderFields}
  ${accountBasicFields}
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
