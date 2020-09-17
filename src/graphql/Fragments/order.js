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
      account {
        id
        fullName
      }
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
