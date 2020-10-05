import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";

export const createChatMessage = gql`
  mutation($input: CreateChatMessageInput!) {
    createChatMessage(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const markUnmarkChatMessage = gql`
  mutation($chatMessage: UUID!) {
    markUnmarkChatMessage(chatMessage: $chatMessage) {
      marked
    }
  }
`;
