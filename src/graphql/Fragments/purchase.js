import gql from "graphql-tag";
import { servicePurchaseFields } from "@/graphql/Fragments/service-purchase";
import { accountBasicFields } from "@/graphql/Fragments/account";

export const purchaseFields = gql`
  fragment purchaseFields on ServicePurchaseType {
    ...servicePurchaseFields
    canBeApproved
    canBeCanceled
    canBeInDispute
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
