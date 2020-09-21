import gql from "graphql-tag";

export const serviceOptionFields = gql`
  fragment serviceOptionFields on ServiceOptionType {
    id
    label
    description
    delay
    delayDisplay
    price
  }
`;
