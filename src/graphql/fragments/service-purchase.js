import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";

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
    reason
  }
`;

export const litigationFields = gql`
  fragment litigationFields on LitigationType {
    id
    title
    content
    opened
    handled
    approved
    canceled
    status
    decision
    reason
  }
`;

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    basePrice
    status
    delay
    initiated
    accepted
    refused
    delivered
    approved
    canceled
    inDispute
    updateInitiated
    updateAccepted
    updateRefused
    updateDelivered
    deadlineAt
    hasBeenAccepted
    canChat
    serviceOptions {
      ...serviceOptionFields
    }
    litigation {
      ...litigationFields
    }
  }
  ${serviceOptionFields}
  ${litigationFields}
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
