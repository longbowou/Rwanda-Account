import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/Fragments/service-option";

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    status
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
