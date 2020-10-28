import gql from "graphql-tag";
import { orderFields } from "@/graphql/fragments/order";
import { servicePurchaseUpdateRequestOrderFields } from "@/graphql/order-queries";
import { accountBasicFields } from "@/graphql/fragments/account";
import { servicePurchaseTimelineFields } from "@/graphql/fragments/service-purchase";

export const orderSubscription = gql`
  subscription orderSubscription($id: UUID!) {
    servicePurchaseSubscription(id: $id) {
      servicePurchase {
        ...orderFields
        updateRequest {
          ...servicePurchaseUpdateRequestOrderFields
        }
        account {
          ...accountBasicFields
        }
        ...servicePurchaseTimelineFields
      }
    }
  }
  ${orderFields}
  ${servicePurchaseUpdateRequestOrderFields}
  ${accountBasicFields}
  ${servicePurchaseTimelineFields}
`;
