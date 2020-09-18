import gql from "graphql-tag";
import { orderFields } from "@/graphql/Fragments/order";

export const queryOrder = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...orderFields
      account {
        id
        fullName
      }
    }
  }
  ${orderFields}
`;
