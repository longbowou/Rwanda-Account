import gql from "graphql-tag";
import { servicePurchaseFields } from "@/graphql/Fragments/service-purchase";

export const orderFields = gql`
  fragment orderFields on ServicePurchaseType {
    ...servicePurchaseFields
    canBeAccepted
    canBeDelivered
    canAddDeliverable
    service {
      id
      title
    }
  }
  ${servicePurchaseFields}
`;
