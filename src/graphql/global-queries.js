import gql from "graphql-tag";

export const queryParameters = gql`
  query {
    parameters {
      basePrice
      currency
      depositFee
    }
  }
`;

export const queryPayment = gql`
  query queryPayment($id: UUID!) {
    payment(id: $id) {
      confirmed
      canceled
      amount
    }
  }
`;
