import gql from "graphql-tag";
import { orderFields } from "@/graphql/Fragments/order";
import { servicePurchaseChatFields } from "@/graphql/Fragments/service-purchase";

export const queryOrder = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...orderFields
      account {
        id
        fullName
      }
    }
  }
  ${orderFields}
`;

export const queryOrderChat = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseChatFields
      account {
        id
        fullName
      }
    }
  }
  ${servicePurchaseChatFields}
`;
