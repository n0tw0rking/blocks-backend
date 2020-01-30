const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    
    input UserInput {
      email : String!
      password : String!
      isAdmin: Boolean
    }
    input BlockInput{
        name : String!
        location:String 
    }
    input MessageInput {
        message : String!   
    }
    input SubInput{
        name :String!
        email:String!
        block:String!
    }
    input RequestInput {
        username: String!
        password: String!
        email: String!
        verifyCode: String
    }
    type Request {
    _id : ID!
    username: String!
    email : String!
    password : String!
    verifyCode: String
    }

    type User {
    _id : ID!
    email : String!
    password : String 
    userMesg : [Message!]!
    userSubscription :[Subscription!]!
    isAdmin : Boolean!
    }
    
    type Block {
        _id:ID!
        name : String!
        location :String 
        userSubscription:[Subscription!]!
    }

    type Message{
        _id:ID!
        message:String!
        sender : User!
    }

    type AuthData{
        userId : ID !
        token : String!
        tokenExpriration : Int!
    }

    type Balance {
        _id : ID!
        value : Float!
    }

    type Subscription {
        _id : ID!
        name : String!
        balance : Balance!
        user : User !
        block : Block!
        service :[Service!]!
    }

    type Service {
        _id : ID! 
        name : String!
        subscriptionId:[Subscription!]!
    }

    type RootQuery {
        oneUser:User!
        login(userInput :UserInput) :  AuthData!
        message: [Message!]!
        oneSubscription(name:String!) : Subscription! 
        service:[Service!]!
        oneService(name:String!):Service!
        oneBlock(name:String!):Block!
    }
    type MutationQuery{
        createUser(userInput :UserInput ): User!
        createBlock(blockInput : BlockInput) : Block! 
        createMessage(messageInput : MessageInput):Message!
        createService (name :String!):Service!
        createSub(subInput:SubInput) : Subscription!
        addSub(email:String!):User!
        addBalance(value : Float!): Balance!
        addSerToSub(serviceName:String!,subName:String!): Service!
        addAdminToBlock(blockName:String!,email:String!):Block!
        createNewUser(username: String!, password: String!, email: String!) : Request!   
    }
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);
