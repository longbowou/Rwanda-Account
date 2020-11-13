import gql from "graphql-tag";

export const serviceForViewFields = gql`
  fragment serviceForViewFields on ServiceType {
    id
    title
    content
    delayDisplay
    keywords
    createdAt
    accepted
    rejected
    submittedForApproval
    canBeSubmittedForApproval
    status
    rejectedReason
    serviceCategory {
      label
    }
  }
`;
