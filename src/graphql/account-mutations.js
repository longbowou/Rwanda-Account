import gql from "graphql-tag";
import { accountFields } from "@/graphql/fragments/account";
import { errorFields } from "@/graphql/fragments/global";

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

export const initiateDeposit = gql`
  mutation($amount: Int!) {
    initiateDeposit(amount: $amount) {
      errors {
        ...errorFields
      }
      paymentUrl
      formData
      paymentId
    }
  }
  ${errorFields}
`;

export const initiateRefund = gql`
  mutation($input: InitiateRefundInput!) {
    initiateRefund(input: $input) {
      errors {
        ...errorFields
      }
      refund {
        amount
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;
