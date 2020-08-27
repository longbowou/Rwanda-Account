import gql from "graphql-tag";

export const accountFields = gql`
  fragment accountFields on AccountType {
    id
    fullName
    balance
    email
    firstName
    lastName
    servicesCount
    purchasesCount
  }
`;