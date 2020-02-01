module.exports = ` 
        type RootQuery {
        oneUser:User
        login(userInput :UserInput) :  AuthData
        message: [Message!]
        oneSubscription(name:String!) : Subscription
        service:[Service!]
        oneService(name:String!):Service
        oneBlock(name:String!):Block 
    }`;
