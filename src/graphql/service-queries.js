import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";
import { accountBasicFields } from "@/graphql/fragments/account";
import { serviceForViewFields } from "@/graphql/fragments/service";

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

export const queryServiceCategory = gql`
  query serviceCategory($id: UUID!) {
    serviceCategory(id: $id) {
      id
      label
      services {
        id
        title
        fileUrl
        account {
          ...accountBasicFields
        }
      }
    }
  }
  ${accountBasicFields}
`;

export const queryServiceCategoryServices = gql`
  query serviceCategoryServices($id: UUID!) {
    serviceCategoryServices(id: $id) {
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
          imageUrl
        }
      }
    }
  }
`;

export const queryServiceForView = gql`
  query service($id: UUID!) {
    service(id: $id) {
      ...serviceForViewFields
    }
  }
  ${serviceForViewFields}
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
