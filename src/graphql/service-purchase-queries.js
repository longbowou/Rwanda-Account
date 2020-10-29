import gql from "graphql-tag";
import { servicePurchaseTimelineFields } from "@/graphql/Fragments/service-purchase";

export const queryServicePurchaseTimeline = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseTimelineFields
    }
  }
  ${servicePurchaseTimelineFields}
`;
