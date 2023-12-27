// export const getVendorsQuery = /* GraphQL */ `
//   query getVendors {
//     products(first: 250) {
//       edges {
//         node {
//           vendor
//         }
//       }
//     }
//   }
// `;

export const getVendorsQuery = /* GraphQL */ `
  query getVendors {
    products(first: 250) {
      edges {
        node {
          vendor
          collections(first: 200) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`;


export const getTagsQuery = /* GraphQL */ `
  query getVendors {
    products(first: 250) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;
