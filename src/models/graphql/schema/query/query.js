module.exports = ` 
        type RootQuery {
        isAuth : String
        isSuperIsAdmin(id:String!): SuperAndAdmin
        oneUser:User
        login(userInput :UserInput) :  AuthData
        message: [Message!]
        oneSubscription(name:String!) : Subscription
        service:[Service!]
        oneService(name:String!):Service
        oneBlock(name:String!):Block
    }`;
