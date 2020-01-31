module.exports = `
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
    `;
