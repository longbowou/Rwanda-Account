import gql from "graphql-tag";
import { purchaseFields } from "@/graphql/Fragments/purchase";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...purchaseFields
    }
  }
  ${purchaseFields}
`;
