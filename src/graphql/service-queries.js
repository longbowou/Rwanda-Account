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
