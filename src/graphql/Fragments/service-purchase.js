import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/Fragments/service-option";

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    status
    delay
    initiated
    accepted
    delivered
    approved
    inDispute
    deadlineAt
    hasBeenAccepted
    serviceOptions {
      ...serviceOptionFields
    }
  }
  ${serviceOptionFields}
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
    content
    fromCurrentAccount
    time
    showDate
    date
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
