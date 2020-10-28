import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { servicePurchaseChatMessageFields } from "@/graphql/fragments/service-purchase";

export const createChatMessage = gql`
  mutation($input: CreateChatMessageInput!) {
    createChatMessage(input: $input) {
      errors {
        ...errorFields
      }
      chatMessage {
        display {
          ...servicePurchaseChatMessageFields
        }
      }
    }
  }
  ${errorFields}
  ${servicePurchaseChatMessageFields}
`;

export const markUnmarkChatMessage = gql`
  mutation($chatMessage: UUID!) {
    markUnmarkChatMessage(chatMessage: $chatMessage) {
      marked
    }
  }
`;
