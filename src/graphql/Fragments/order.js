import gql from "graphql-tag";

export const orderFields = gql`
  fragment orderFields on ServicePurchaseType {
    id
    number
    price
    status
    initiated
    accepted
    delivered
    approved
    canceled
    inDispute
    mustBeDeliveredAt
    canBeAccepted
    canBeDelivered
    service {
      id
      title
    }
    serviceOptions {
      id
      label
      delay
      price
    }
    timelines {
      happenAt
      status
      color
      description
    }
  }
`;
