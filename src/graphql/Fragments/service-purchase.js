import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/Fragments/service-option";

export const servicePurchaseUpdateRequestFields = gql`
  fragment servicePurchaseUpdateRequestFields on ServicePurchaseUpdateRequestType {
    id
    title
    content
    initiated
    accepted
    refused
    delivered
    status
    deadlineAt
    canBeAccepted
    canBeRefused
    canBeDelivered
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
    refused
    delivered
    approved
    inDispute
    updateInitiated
    updateAccepted
    updateRefused
    updateDelivered
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
