import gql from 'graphql-tag';
import client from "./ApolloClient"

const PRODUCTS_QUERY =gql`query{
    posts {
        nodes {
          title
          content
          date
          featuredImage{
            mediaItemUrl
          }
          comments {
            nodes {
              content
              date
              author {
                ... on CommentAuthor {
                  name
                }
              }
              
            }
          }
        }
      }
}`;


const getPosts = async () => {
    const {loading,error,data} = await client.query({query:PRODUCTS_QUERY});
    // {loading?console.log("loading..."): console.log("loaded successfully")}
    // {error?console.log("sorry there seems to be an error"):console.log("No errors retrieving data!")}
    // {data  ? console.log(data.products.nodes )  : console.log("there doesn't seem to be any products here")}
    return (data.posts.nodes )

    };

    export default getPosts
