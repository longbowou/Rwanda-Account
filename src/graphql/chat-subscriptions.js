import gql from "graphql-tag";
import { servicePurchaseChatMessageFields } from "@/graphql/Fragments/service-purchase";

export const chatMessageSubscription = gql`
  subscription chatMessageSubscription($servicePurchase: UUID!) {
    chatMessageSubscription(servicePurchase: $servicePurchase) {
      message {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;
