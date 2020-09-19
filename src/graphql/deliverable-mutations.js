import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { deliverableFields } from "@/graphql/Fragments/deliverable";

export const createDeliverable = gql`
  mutation($input: CreateDeliverableInput!) {
    createDeliverable(input: $input) {
      errors {
        ...errorFields
      }
      deliverable {
        ...deliverableFields
      }
    }
  }
  ${errorFields}
  ${deliverableFields}
`;

export const updateDeliverable = gql`
  mutation($input: UpdateDeliverableInput!) {
    updateDeliverable(input: $input) {
      errors {
        ...errorFields
      }
      deliverable {
        ...deliverableFields
      }
    }
  }
  ${errorFields}
  ${deliverableFields}
`;

export const deleteDeliverable = gql`
  mutation($id: UUID!) {
    deleteDeliverable(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const deleteDeliverableFile = gql`
  mutation($id: UUID!) {
    deleteDeliverableFile(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
