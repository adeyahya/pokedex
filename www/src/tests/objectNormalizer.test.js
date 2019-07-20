import objectNormalizer from '../utils/objectNormalizer';
import _ from 'ramda';

const removeTypename = objectNormalizer(['__typename']);

const data = {
  name: 'juan',
  class: {
    __typename: 'class',
    grade: {
      amount: 8,
      __typename: 'grade',
    }
  },
  arr: [
    {
      name: 'arryangga',
      __typename: 'Arr',
    },
  ],
  shouldRemoved: null,
  __typename: 'Pokemon',
}
const testCases = [
  {
    path: ['name'],
    expect: 'string',
  },
  {
    path: ['__typename'],
    expect: 'undefined'
  },
  {
    path: ['class', 'grade', 'amount'],
    expect: 'number'
  },
  {
    path: ['shouldRemoved'],
    expect: 'undefined'
  },
  {
    path: ['arr', 0, 'name'],
    expect: 'string'
  },
  {
    path: ['arr', 0, '__typename'],
    expect: 'undefined'
  },
];

describe('Test objectNormlizer', () => {
  const normalizedData = removeTypename(data);
  testCases.forEach((item, idx) => {
    it(`should have expected key (${idx + 1})`, () => {
      const targetVal = _.path(item.path, normalizedData);
      expect(typeof targetVal).toEqual(item.expect);
    })
  })
})