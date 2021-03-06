import { JSONSchema7 } from 'json-schema'
import { reduce } from 'lodash'
import * as mongoose from 'mongoose'
import { getSchemaType } from './schema-types'

export class Schema {
  private _schema: mongoose.Schema

  constructor(properties: JSONSchema7['properties']) {
    this._schema = this.registerMongooseSchema(properties)
    // const setup = R.compose(this.registerSchema)

    // Object.entries(properties).forEach(setup())
  }

  // private registerSchema = () => (property: [string, JSONSchema7]) => {
  //   const [field, type] = property
  //   const schemaDefinition: mongoose.SchemaDefinition = {
  //     [field]: getSchemaType(type),
  //   }

  //   this._schema = new mongoose.Schema(schemaDefinition)

  //   return property
  // }

  get mongooseSchema(): mongoose.Schema {
    return this._schema
  }

  private registerMongooseSchema(
    properties: JSONSchema7['properties'],
  ): mongoose.Schema {
    if (!properties) {
      throw new Error('JsonSchema7 properties is undefined')
    }

    const schemaDefinition: mongoose.SchemaDefinition = reduce<
      JSONSchema7['properties'],
      mongoose.SchemaDefinition
    >(
      properties as any,
      (
        mongooseSchemaDefinition: mongoose.SchemaDefinition,
        type: JSONSchema7['properties'],
        schemaName,
      ) => {
        return {
          ...mongooseSchemaDefinition,
          [schemaName]: getSchemaType(type as any),
        }
      },
      {},
    )

    return new mongoose.Schema(schemaDefinition)
  }
}
