import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";

export const queryServiceOption = gql`
  query serviceOption($id: UUID!) {
    serviceOption(id: $id) {
      ...serviceOptionFields
    }
  }
  ${serviceOptionFields}
`;
