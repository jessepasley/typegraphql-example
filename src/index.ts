import "reflect-metadata"

import * as Express from "express"

import { ApolloServer } from "apollo-server-express"
import { RegisterResolver } from "./modules/user/Register"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"

const main = async () => {
    await createConnection()

    const schema = await buildSchema({
        resolvers: [RegisterResolver]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql")
    })
}

main()