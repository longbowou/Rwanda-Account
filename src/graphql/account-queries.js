import gql from "graphql-tag";
import { accountFields } from "@/graphql/Fragments/account";

export const queryAccount = gql`
  query {
    account {
      ...accountFields
    }
  }
  ${accountFields}
`;
