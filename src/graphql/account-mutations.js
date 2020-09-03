import gql from "graphql-tag";
import { accountFields } from "@/graphql/Fragments/account";
import { errorFields } from "@/graphql/Fragments/global";

export const updateAccount = gql`
  mutation($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
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

export const changeAccountPassword = gql`
  mutation($input: ChangeAccountPasswordInput!) {
    changeAccountPassword(input: $input) {
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
