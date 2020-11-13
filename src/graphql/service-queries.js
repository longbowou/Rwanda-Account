import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";
import { accountBasicFields } from "@/graphql/fragments/account";

export const queryServicesForPreview = gql`
  query {
    services {
      id
      title
      fileUrl
      account {
        ...accountBasicFields
      }
    }
  }
  ${accountBasicFields}
`;

export const queryServiceCategories = gql`
  query {
    serviceCategories {
      id
      label
    }
  }
`;

export const queryServiceForDetail = gql`
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
      basePrice
      published
      fileUrl
      serviceCategory {
        id
        label
      }
      account {
        ...accountBasicFields
      }
      options {
        ...serviceOptionFields
      }
    }
  }
  ${accountBasicFields}
  ${serviceOptionFields}
`;

export const queryServiceComments = gql`
  query service($id: UUID!) {
    service(id: $id) {
      positiveCommentsCount
      negativeCommentsCount
      comments {
        id
        positive
        negative
        content
        createdAt
        account {
          firstName
        }
      }
    }
  }
`;

export const queryServiceForView = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delayDisplay
      keywords
      createdAt
      publishedDisplay
      fileUrl
      serviceCategory {
        label
      }
    }
  }
`;

export const queryServiceForEdit = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delay
      keywords
      published
      fileUrl
      serviceCategory {
        id
      }
    }
  }
`;

export const queryServiceBasicFields = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
    }
  }
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
        delayPreviewDisplay
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
