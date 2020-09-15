import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";

export const createService = gql`
  mutation($input: CreateServiceInput!) {
    createService(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const updateService = gql`
  mutation($input: UpdateServiceInput!) {
    updateService(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const deleteService = gql`
  mutation($id: UUID!) {
    deleteService(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
