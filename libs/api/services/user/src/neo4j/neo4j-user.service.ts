import { Inject, Injectable } from '@nestjs/common'
import { Driver } from 'neo4j-driver'
import { NEO4J_DATABASE_PROVIDER } from './database'

@Injectable()
export class Neo4jUserService {
  constructor(
    @Inject(NEO4J_DATABASE_PROVIDER) private readonly neo4j: Driver,
  ) {}

  async findAll(): Promise<any> {
    return this.neo4j.session().run('MATCH (n:Movie) RETURN n LIMIT 5')
  }

  async run(query: string): Promise<any> {
    return this.neo4j.session().run(query)
  }
}
