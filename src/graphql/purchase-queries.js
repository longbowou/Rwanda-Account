import gql from "graphql-tag";
import { servicePurchaseFields } from "@/graphql/Fragments/purchase";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseFields
    }
  }
  ${servicePurchaseFields}
`;
