import gql from "graphql-tag";

export const accountFields = gql`
  fragment accountFields on AccountType {
    id
    fullName
    balance
    email
    firstName
    lastName
    username
    servicesCount
    purchasesCount
    ordersCount
    depositsSum
    refundsSum
    earningsSum
  }
`;

export const accountBasicFields = gql`
  fragment accountBasicFields on AccountType {
    id
    fullName
    balance
    isOnline
    lastLogin
  }
`;
