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
