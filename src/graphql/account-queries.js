import gql from "graphql-tag";
import { accountFields } from "@/graphql/fragments/account";

export const queryAccount = gql`
  query {
    account {
      ...accountFields
    }
  }
  ${accountFields}
`;

export const queryRefundWays = gql`
  query {
    refundWays {
      id
      name
      countryCode
    }
  }
`;
