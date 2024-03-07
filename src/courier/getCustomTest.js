import gql from 'graphql-tag';
import client from "./ApolloClient"

const PRODUCTS_QUERY =gql`query{
  productCategories(where: {parent: 1371}) {
    
    edges {
      node {
        databaseId
        name
        description
        image{sourceUrl}
        children(first: 6) {
          edges {
            node {
              databaseId
              name
              contentNodes(first: 10) {
                edges {
                  node {
                    ... on SimpleProduct {
                      databaseId
                      productId
                      name
                      price
                      length
                      height
                      weight
                      width
                      purchasable
                      stockStatus
                      stockQuantity
                      image{
                        sourceUrl
                      }                
                      galleryImages{
                        nodes{
                          sourceUrl
                        }
                      }

                      productTags {
                        nodes {
                          name
                        }
                      }

                      attributes{
                        nodes{
                          name
                          options
                        }
                      }
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;


const getCustomOrderTestProps = async () => {
    const {loading,error,data} = await client.query({query:PRODUCTS_QUERY});
    // {loading?console.log("loading..."): console.log("loaded successfully")}
    // {error?console.log("sorry there seems to be an error"):console.log("No errors retrieving data!")}
    // {data  ? console.log(data.productCategories)  : console.log("there doesn't seem to be any products here")}
     console.log("test invoked before store component",data.productCategories )
    return (data.productCategories)

    };

    export default getCustomOrderTestProps

