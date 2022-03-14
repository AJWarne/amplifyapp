/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCertificate = /* GraphQL */ `
  query GetCertificate($id: ID!) {
    getCertificate(id: $id) {
      id
      name
      description
      LoginName
      BusinessName
      NumberOfEmployees
      PeriodOfCertificationMonths
      CarbonTonnes
      PlasticWaste
      TreesPlanted
      DateOfCertification
      DateOfExpiry
      CertID
      createdAt
      updatedAt
    }
  }
`;
export const listCertificates = /* GraphQL */ `
  query ListCertificates(
    $filter: ModelCertificateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertificates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        LoginName
        BusinessName
        NumberOfEmployees
        PeriodOfCertificationMonths
        CarbonTonnes
        PlasticWaste
        TreesPlanted
        DateOfCertification
        DateOfExpiry
        CertID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
