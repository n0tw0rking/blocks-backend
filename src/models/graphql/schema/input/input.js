module.exports = `    
    input UserInput {
      email : String!
      password : String!
      UserId : ID!
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
    }`;
