import gql from "graphql-tag";
import { servicePurchaseChatMessageFields } from "@/graphql/Fragments/service-purchase";

export const chatSubscription = gql`
  subscription chatSubscription($authToken: String!, $servicePurchase: UUID!) {
    chatSubscription(authToken: $authToken, servicePurchase: $servicePurchase) {
      message {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;
