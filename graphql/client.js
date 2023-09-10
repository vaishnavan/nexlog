import { ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/1wohri349roq/environments/master`,
    headers: {
        Authorization: `Bearer tX7m6q5TbiiLlrDHJT196yw8drm0sAk6REH0hkmF2As`,
        'content-type': 'application/json'
    },
    cache: new InMemoryCache()
})

export default client