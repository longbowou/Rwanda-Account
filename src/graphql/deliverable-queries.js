import gql from "graphql-tag";
import { deliverableFields } from "@/graphql/fragments/deliverable";

export const queryDeliverable = gql`
  query deliverable($id: UUID!) {
    deliverable(id: $id) {
      ...deliverableFields
    }
  }
  ${deliverableFields}
`;

export const queryDeliverableVersions = gql`
  query deliverableVersions {
    deliverableVersions {
      label
      value
    }
  }
`;
