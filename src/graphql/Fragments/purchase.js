import gql from "graphql-tag";

export const purchaseFields = gql`
  fragment purchaseFields on ServicePurchaseType {
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
    deadlineAt
    hasBeenAccepted
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
