const { default: axios } = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql');
const data = require('./data.json')

//Get All Wines
const GetWines = new GraphQLObjectType({
    name: 'wines',
    fields: () => ({
        name: { type: GraphQLString },
        brand: { type: GraphQLString },
        price: { type: GraphQLInt },
        discount: { type: GraphQLString },
        image: {  type: GraphQLString }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(GetWines),
            resolve(parent, args) {
                return axios
                .get('https://mocki.io/v1/13ab24bc-8270-4b3f-aaff-e74f47961a61')
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})