import gql from "graphql-tag";
import {errorFields} from "@/graphql/Fragments/global";
import {accountFields} from "@/graphql/Fragments/account";

export const createService = gql`
  mutation($input: CreateServiceInput!) {
    createService(input: $input) {
      errors {
        ...errorFields
      }
      service {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
`;

export const updateService = gql`
  mutation($input: UpdateServiceInput!) {
    updateService(input: $input) {
      errors {
        ...errorFields
      }
      service {
        account {
          ...accountFields
        }
      }
    }
  }
  ${errorFields}
  ${accountFields}
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

