import gql from "graphql-tag";
import { orderFields } from "@/graphql/Fragments/order";
import { servicePurchaseUpdateRequestOrderFields } from "@/graphql/order-queries";
import { accountBasicFields } from "@/graphql/Fragments/account";
import { servicePurchaseTimelineFields } from "@/graphql/Fragments/service-purchase";

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
