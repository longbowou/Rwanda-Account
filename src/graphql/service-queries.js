import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/Fragments/service-option";

export const queryServices = gql`
  query {
    services {
      id
      title
      account {
        fullName
      }
      stars
      servicemediaSet {
        fileUrl
        url
      }
      serviceoptionSet {
        label
        description
        price
        delay
      }
    }
  }
`;

export const queryServiceCategories = gql`
  query {
    serviceCategories {
      id
      label
    }
  }
`;

export const queryService = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delay
      delayDisplay
      keywords
      stars
      createdAt
      optionsCount
      optionsCountDisplay
      serviceCategory {
        id
        label
      }
      account {
        fullName
      }
      servicemediaSet {
        fileUrl
        url
      }
      options {
        ...serviceOptionFields
      }
    }
  }
  ${serviceOptionFields}
`;

export const queryServiceOrderPreview = gql`
  query serviceOrderPreview($service: UUID!, $serviceOptions: [UUID!]) {
    serviceOrderPreview(service: $service, serviceOptions: $serviceOptions) {
      totalOrderPrice
      totalOrderPriceTtc
      cannotPayWithWallet
      basePrice
      commission
      commissionTva
      totalPrice
      totalPriceTva
      deadlineAt
      totalDelay
      serviceOptions {
        id
        label
        price
      }
      service {
        id
        title
        serviceCategory {
          label
        }
      }
    }
  }
`;
