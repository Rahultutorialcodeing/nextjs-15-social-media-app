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

input posts{
    content:String
}



scalar Date

type Userall{
    username: String
      displayname: String
      userAvtar: String
}
type Userdata {
  id:String
  content: String
  createdAt: Date
  user:Userall
}

type PostPage {
  posts: [Userdata]
  nextCursor: String
}

type sendPost{
    content:String
    user:Userall
    createdAt: Date
}

`;
