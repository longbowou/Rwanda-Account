import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { accountFields } from "@/graphql/Fragments/account";

export const initServicePurchase = gql`
  mutation($input: InitServicePurchaseInput!) {
    initServicePurchase(input: $input) {
      errors {
        ...errorFields
      }
      servicePurchase {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;
