import gql from "graphql-tag";
import { accountBasicFields } from "@/graphql/fragments/account";

export const onlineSubscription = gql`
  subscription onlineSubscription {
    onlineSubscription {
      account {
        ...accountBasicFields
      }
    }
  }
  ${accountBasicFields}
`;

export const accountOnlineSubscription = gql`
  subscription accountOnlineSubscription($account: UUID!) {
    accountOnlineSubscription(account: $account) {
      account {
        ...accountBasicFields
      }
    }
  }
  ${accountBasicFields}
`;
