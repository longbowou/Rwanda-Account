import gql from "graphql-tag";

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
      keywords
      published
      stars
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
      mustBeDeliveredAt
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
