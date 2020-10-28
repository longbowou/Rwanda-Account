import gql from "graphql-tag";
import { purchaseFields } from "@/graphql/fragments/purchase";
import {
  servicePurchaseChatFields,
  servicePurchaseChatMessageFields,
  servicePurchaseUpdateRequestFields
} from "@/graphql/fragments/service-purchase";
import { accountBasicFields } from "@/graphql/fragments/account";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...purchaseFields
      updateRequest {
        ...servicePurchaseUpdateRequestFields
      }
      lastUpdateRequest {
        ...servicePurchaseUpdateRequestFields
      }
    }
  }
  ${purchaseFields}
  ${servicePurchaseUpdateRequestFields}
`;

export const queryPurchaseChatMessages = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      ...servicePurchaseChatFields
      service {
        account {
          ...accountBasicFields
        }
      }
    }
  }
  ${servicePurchaseChatFields}
  ${accountBasicFields}
`;

export const queryPurchaseChatFiles = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      chatFiles {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;

export const queryPurchaseChatMarked = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
      chatMarked {
        ...servicePurchaseChatMessageFields
      }
    }
  }
  ${servicePurchaseChatMessageFields}
`;

export const queryServiceCommentTypes = gql`
  query queryServiceCommentTypes {
    serviceCommentTypes {
      name
      value
    }
  }
`;
