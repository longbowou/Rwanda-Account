import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { accountFields } from "@/graphql/Fragments/account";
import { authTokenFields } from "@/graphql/Fragments/global";

export const login = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      errors {
        ...errorFields
      }
      account {
        ...accountFields
      }
      auth {
        ...authFields
      }
    }
  }
  ${errorFields}
  ${accountFields}
  ${authTokenFields}
`;
