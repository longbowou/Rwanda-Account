import gql from "graphql-tag";
import { accountBasicFields } from "@/graphql/Fragments/account";

export const onlineSubscription = gql`
  subscription onlineSubscription($authToken: String!) {
    onlineSubscription(authToken: $authToken) {
      account {
        ...accountBasicFields
      }
    }
  }
  ${accountBasicFields}
`;

export const accountOnlineSubscription = gql`
  subscription accountOnlineSubscription($authToken: String!, $account: UUID!) {
    accountOnlineSubscription(authToken: $authToken, account: $account) {
      account {
        ...accountBasicFields
      }
    }
  }
  ${accountBasicFields}
`;
