module.exports = `
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
    isSuperAdmin : Boolean!
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
        isAdmin : Boolean!
        isSuperAdmin : Boolean!
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

    type SuperAndAdmin {
        isSuperAdmin : Boolean!
        isAdmin : Boolean!
    }
`;
