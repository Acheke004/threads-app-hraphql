import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

app.use(express.json())

  const server = new ApolloServer({
    typeDefs: `
    
    type Query{
        hello: String!
        say(name:String):String
    }
    
    
    `,//schema 
    resolvers: {
        Query:{
            hello:()=>"HELLO THEIR",
            say:(_,{name}:{name:string})=>`hey ${name},how are you?`
        }

    },//actual function 
  });

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();


  
  app.get("/", (req, resp) => {
    resp.json({ message: "server is up" });
  });
  app.use('/graphql', expressMiddleware(server))
  app.listen(PORT, () => console.log(`server started on PORT${PORT}`));
}
init()