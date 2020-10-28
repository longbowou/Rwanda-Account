import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { accountFields } from "@/graphql/fragments/account";
import { authTokenFields } from "@/graphql/fragments/global";

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

export const register = gql`
  mutation($input: AccountInput!) {
    createAccount(input: $input) {
      errors {
        ...errorFields
      }
      account {
        ...accountFields
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;
