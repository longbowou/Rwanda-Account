import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { accountFields } from "@/graphql/fragments/account";
import { serviceForViewFields } from "@/graphql/fragments/service";

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

export const submitServiceForApproval = gql`
  mutation($input: SubmitServiceForApprovalInput!) {
    submitServiceForApproval(input: $input) {
      errors {
        ...errorFields
      }
      service {
        ...serviceForViewFields
      }
    }
  }
  ${errorFields}
  ${serviceForViewFields}
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
