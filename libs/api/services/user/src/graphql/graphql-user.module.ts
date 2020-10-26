import { Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { LoggerModule } from '@codelab/api/providers/logger'

@Module({
  imports: [LoggerModule],
  providers: [UserResolver],
})
export class GraphQlUserModule {}
