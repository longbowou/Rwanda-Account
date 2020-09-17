import gql from "graphql-tag";

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
    canceled
    inDispute
    mustBeDeliveredAt
    canBeApproved
    canBeCanceled
    canBeInDispute
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
