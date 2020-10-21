import dot from 'dot-object'
import { reduce } from 'lodash'
import objectMapper from 'object-mapper'

dot.keepArray = true

export type MapperObject = {
  [key: string]: any
}

export type PathIteratee = (
  path: string,
  original?: any,
) => string | Array<string>

export type MapData = {
  src: { path: string; iteratee?: PathIteratee } // transform src path
  target: { path: string; iteratee?: PathIteratee } // transform target path
}

export class Mapper {
  original: MapperObject

  map: Array<MapData>

  constructor(original: MapperObject, map: Array<MapData>) {
    this.original = original
    this.map = map
  }

  execute2() {
    const map = reduce<MapData, MapperObject>(
      this.map,
      (newShape: MapperObject, mapper: MapData) => {
        const mapData: MapperObject = {}
        const { src, target } = mapper
        const dotOriginal = dot.dot(this.original)

        const srcPath = !src.iteratee
          ? src.path
          : src.iteratee(src.path, dotOriginal)

        const targetPath = !target.iteratee
          ? target.path
          : target.iteratee(target.path, dotOriginal)

        const srcPathArr = Array.isArray(srcPath) ? srcPath : [srcPath]
        const targetPathArr = Array.isArray(targetPath)
          ? targetPath
          : [targetPath]

        srcPathArr.forEach((item: string, index: number) => {
          mapData[item] = targetPathArr[index]
        })

        return { ...newShape, ...mapData }
      },
      {},
    )

    return objectMapper.merge(this.original, map)
  }
}
