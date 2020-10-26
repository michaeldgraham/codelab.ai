import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class UserModel {
  @Field((type) => ID)
  declare id: number

  @Field()
  declare username: string
}
