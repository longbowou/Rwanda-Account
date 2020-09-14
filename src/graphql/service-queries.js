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

export const queryService = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delay
      serviceCategory {
        label
      }
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
