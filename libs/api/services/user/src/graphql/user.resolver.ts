import { Inject } from '@nestjs/common'
import { Query, ResolveReference, Resolver } from '@nestjs/graphql'
import { UserModel } from './user.model'
import {
  CODELAB_LOGGER_PROVIDER,
  CodelabLogger,
} from '@codelab/api/providers/logger'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER) private readonly logger: CodelabLogger,
  ) {}

  @ResolveReference()
  resolveReference(node: { __typename: string; id: number }) {
    this.logger.log('Hello')

    return new UserModel()
  }

  @Query((returns) => UserModel)
  test() {
    return new UserModel()
  }
}
