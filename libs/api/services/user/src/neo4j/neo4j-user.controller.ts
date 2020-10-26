import { Body, Controller, Get, Post } from '@nestjs/common'
import { Neo4jUserService } from './neo4j-user.service'

@Controller('neo4j')
export class Neo4jUserController {
  constructor(private readonly neo4jService: Neo4jUserService) {}

  @Get()
  async findAll() {
    return this.neo4jService.findAll()
  }

  @Post()
  async run(@Body() { query }: { query: string }) {
    return this.neo4jService.run(query)
  }
}
