import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";

export const createServiceOption = gql`
  mutation($input: CreateServiceOptionInput!) {
    createServiceOption(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
export const updateServiceOption = gql`
  mutation($input: UpdateServiceOptionInput!) {
    updateServiceOption(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
export const deleteServiceOption = gql`
  mutation($id: UUID!) {
    deleteServiceOption(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
