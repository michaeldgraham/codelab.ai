import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { Neo4jUserModule } from '@codelab/api/services/user'

@Module({
  imports: [ConfigModule, Neo4jUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
