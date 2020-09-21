import gql from "graphql-tag";
import { servicePurchaseFields } from "@/graphql/Fragments/service-purchase";

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
        id
        fullName
      }
    }
  }
  ${servicePurchaseFields}
`;
