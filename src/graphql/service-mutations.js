import gql from "graphql-tag";
import { errorFields } from "@/graphql/Fragments/global";
import { accountFields } from "@/graphql/Fragments/account";

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

export const createServiceOption = gql`
  mutation($input: CreateServiceOptionInput!) {
    createServiceOption(input: $input) {
      errors {
        ...errorFields
      }
      serviceOption {
        id
        label
        description
        price
        delay
        published
        service {
          id
        }
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
      serviceOption {
        id
        label
        description
        price
        delay
        published
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
