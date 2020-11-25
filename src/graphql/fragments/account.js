import gql from "graphql-tag";

export const accountFields = gql`
  fragment accountFields on AccountType {
    id
    firstName
    lastLogin
    fullName
    balance
    email
    phoneNumber
    firstName
    lastName
    username
    imageUrl
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
    username
    firstName
    lastName
    fullName
    balance
    isOnline
    lastLogin
    imageUrl
  }
`;
