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

export const queryLitigation = gql`
  query service($id: UUID!) {
    litigation(id: $id) {
      id
      title
      description
      servicePurchase {
        id
      }
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
      published
      stars
      createdAt
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
      serviceoptionSet {
        label
        description
        price
        delay
      }
    }
  }
`;
export const queryServiceOptions = gql`
  query {
    serviceOptions {
      id
      label
      description
      delay
      price
      published
      service {
        id
      }
    }
  }
`;
export const queryServiceOption = gql`
  query serviceOption($id: UUID!) {
    serviceOption(id: $id) {
      id
      label
      description
      delay
      price
      published
      service {
        id
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
