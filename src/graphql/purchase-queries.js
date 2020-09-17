import gql from "graphql-tag";

export const queryServicePurchase = gql`
  query servicePurchase($id: UUID!) {
    servicePurchase(id: $id) {
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
  }
`;
