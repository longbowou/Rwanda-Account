import gql from "graphql-tag";
import { purchaseFields } from "@/graphql/fragments/purchase";
import {
  servicePurchaseTimelineFields,
  servicePurchaseUpdateRequestFields
} from "@/graphql/fragments/service-purchase";

export const purchaseSubscription = gql`
  subscription purchaseSubscription($id: UUID!) {
    servicePurchaseSubscription(id: $id) {
      servicePurchase {
        ...purchaseFields
        updateRequest {
          ...servicePurchaseUpdateRequestFields
        }
        lastUpdateRequest {
          ...servicePurchaseUpdateRequestFields
        }
        ...servicePurchaseTimelineFields
      }
    }
  }
  ${purchaseFields}
  ${servicePurchaseUpdateRequestFields}
  ${servicePurchaseTimelineFields}
`;
