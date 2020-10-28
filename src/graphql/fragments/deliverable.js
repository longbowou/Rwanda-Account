import gql from "graphql-tag";

export const deliverableFields = gql`
  fragment deliverableFields on DeliverableType {
    id
    title
    version
    description
    published
    filesCount
  }
`;
