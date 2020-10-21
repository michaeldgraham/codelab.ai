import { MapData, Mapper, MapperObject, PathIteratee } from './mapper-object'
// eslint-disable-next-line @typescript-eslint/no-var-requires

describe('Mapper', () => {
  it('maps from one shape to another', () => {
    const original = {
      data: {
        address: {
          street_1: '2600 Park Ave.',
          street_2: '',
          city: 'New York',
        },
      },
    }
    const expected = {
      address: {
        street: '2600 Park Ave.',
        city: 'New York',
      },
    }

    const map: Array<MapData> = [
      {
        src: { path: 'data.address.street_1' },
        target: { path: 'address.street' },
      },
      {
        src: { path: 'data.address.city' },
        target: { path: 'address.city' },
      },
    ]

    const mapper = new Mapper(original, map)

    expect(mapper.execute2()).toStrictEqual(expected)
  })

  it('maps an array from one shape to another', () => {
    const original = {
      company: {
        devs: [
          { firstname: 'Webber', lastname: 'Wang' },
          { firstname: 'Vien', lastname: 'Nguyen' },
        ],
      },
    }

    const expected = {
      devs: [
        { first: 'Webber', last: 'Wang' },
        { first: 'Vien', last: 'Nguyen' },
      ],
    }

    const map: Array<MapData> = [
      {
        src: { path: 'company.devs[].firstname' },
        target: { path: 'devs[].first' },
      },
      {
        src: { path: 'company.devs[].lastname' },
        target: { path: 'devs[].last' },
      },
    ]

    const mapper = new Mapper(original, map)

    expect(mapper.execute2()).toStrictEqual(expected)
  })

  it('map v2', () => {
    const original = {
      company: {
        devs: [
          { firstname: 'Webber', lastname: 'Wang' },
          { firstname: 'Vien', lastname: 'Nguyen' },
        ],
        info: [
          { key: 'user.address.number', value: '1200' },
          { key: 'user.address.street', value: 'Park ave.' },
        ],
      },
    }

    const expected = {
      devs: [
        { firstname: 'Webber', lastname: 'Wang' },
        { firstname: 'Vien', lastname: 'Nguyen' },
      ],
      user: { address: { number: '1200', street: 'Park ave.' } },
    }

    const srcIteratee: PathIteratee = (path: string, obj: MapperObject) => {
      return obj[path].map(
        (item: any, index: number) => `${path}[${index}].value`,
      )
    }

    const targetIteratee: PathIteratee = (path: string, obj: MapperObject) => {
      return obj[path].map((item: any) => item.key)
    }

    const map: Array<MapData> = [
      {
        src: {
          path: 'company.devs[]',
        },
        target: { path: 'devs[]' },
      },
      {
        src: {
          path: 'company.info',
          iteratee: srcIteratee,
        },
        target: {
          path: 'company.info',
          iteratee: targetIteratee,
        },
      },
    ]

    const mapper = new Mapper(original, map)

    expect(mapper.execute2()).toStrictEqual(expected)
  })
})
