import gql from "graphql-tag";
import { accountBasicFields } from "@/graphql/Fragments/account";
import { servicePurchaseFields } from "@/graphql/Fragments/service-purchase";

export const purchaseFields = gql`
  fragment purchaseFields on ServicePurchaseType {
    ...servicePurchaseFields
    canBeApproved
    canBeCanceled
    canBeInDispute
    canAskForUpdate
    canBeCommented
    service {
      id
      title
      account {
        ...accountBasicFields
      }
    }
  }
  ${servicePurchaseFields}
  ${accountBasicFields}
`;
