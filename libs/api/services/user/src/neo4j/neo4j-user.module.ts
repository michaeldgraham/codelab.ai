import { Logger, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQlUserModule } from '../graphql'
import { NEO4J_DATABASE_PROVIDER, Neo4jDatabaseModule } from './database'
import { Neo4jUserController } from './neo4j-user.controller'
import { Neo4jUserService } from './neo4j-user.service'

const logger = new Logger('Neo4jUserModule')

@Module({
  imports: [
    Neo4jDatabaseModule,
    GraphQlUserModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jDatabaseModule],
      inject: [NEO4J_DATABASE_PROVIDER],
      useFactory: (driver) => {
        return {
          include: [GraphQlUserModule],
          autoSchemaFile: 'schema.gql',
          // // Here schema already has federation added
          // transformSchema: (schema: GraphQLSchema) => {
          //   logger.log(`schema local:  ${schema}`);

          //   const resolvers = extractResolversFromSchema(schema)

          //   // Our user defined schema
          //   const typeDefs: string = printSchema(schema)

          //   const neo4jExtendedSchema = makeAugmentedSchema({
          //     resolvers,
          //     typeDefs,
          //     config: {
          //       isFederated: true,
          //     },
          //   })
          //   // return schema;
          //   return buildFederatedSchema([neo4jExtendedSchema])
          // },
          // transformAutoSchemaFile: true,
          // context: (ctx) => ({
          //   ...ctx,
          //   driver,
          // }),
        }
      },
    }),
  ],
  controllers: [Neo4jUserController],
  providers: [Neo4jUserService],
  exports: [],
})
export class Neo4jUserModule {}
