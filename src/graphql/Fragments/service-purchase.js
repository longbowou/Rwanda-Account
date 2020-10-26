import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/Fragments/service-option";

export const servicePurchaseUpdateRequestFields = gql`
  fragment servicePurchaseUpdateRequestFields on ServicePurchaseUpdateRequestType {
    title
    content
    initiated
    accepted
    rejected
    status
    canBeAccepted
    canBeRejected
  }
`;

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    status
    delay
    initiated
    accepted
    rejected
    delivered
    approved
    inDispute
    requestUpdate
    updateAccepted
    updateRejected
    deadlineAt
    hasBeenAccepted
    serviceOptions {
      ...serviceOptionFields
    }
    updateRequest {
      ...servicePurchaseUpdateRequestFields
    }
  }
  ${serviceOptionFields}
  ${servicePurchaseUpdateRequestFields}
`;

export const servicePurchaseTimelineFields = gql`
  fragment servicePurchaseTimelineFields on ServicePurchaseType {
    timelines {
      happenAt
      status
      color
      description
    }
  }
`;

export const servicePurchaseChatMessageFields = gql`
  fragment servicePurchaseChatMessageFields on ServicePurchaseChatMessageType {
    id
    isFile
    fileName
    fileUrl
    fileSize
    content
    marked
    fromCurrentAccount
    time
    showDate
    date
    dateDisplay
    createdAt
  }
`;

export const servicePurchaseChatFields = gql`
  fragment servicePurchaseChatFields on ServicePurchaseType {
    chat {
      ...servicePurchaseChatMessageFields
    }
  }
  ${servicePurchaseChatMessageFields}
`;
