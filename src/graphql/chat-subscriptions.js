import gql from "graphql-tag";
import { servicePurchaseChatMessageFields } from "@/graphql/Fragments/service-purchase";

export const chatMessageSubscription = gql`
  subscription chatMessageSubscription(
    $authToken: String!
    $servicePurchase: UUID!
  ) {
    chatMessageSubscription(
      authToken: $authToken
      servicePurchase: $servicePurchase
    ) {
      message {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;
