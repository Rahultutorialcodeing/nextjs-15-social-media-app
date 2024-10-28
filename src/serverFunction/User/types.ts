export const types = `#graphql

type outputType{
    success:Boolean!
    message:String!
    username:String
    email:String
}

input User{
    username:String!
    displayname:String!
    email:String!
    passwordHash:String!
}

input Otp{
    username:String!
    code:String!
}

input loginuser{
    usernameOremail:String
    passwordHash:String!
}

`;
