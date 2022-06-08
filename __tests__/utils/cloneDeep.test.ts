import { cloneDeep } from '!utils/cloneDeep';

it('should shallow copy an object', () => {
  const data = {
    a: 1,
    b: 2,
    c: 3,
  };

  const result = cloneDeep(data);

  expect(result).toStrictEqual(data);
  expect(result === data).toBeFalsy();
});

it('should deep copy nested objects', () => {
  const data = {
    nest: {
      a: 1,
    },
  };

  const result = cloneDeep(data);

  expect(result.nest).toStrictEqual(data.nest);
  expect(result.nest === data.nest).toBeFalsy();
});

it('should deep copy deeply nested objects', () => {
  const data = {
    nest: {
      deepNest: {
        a: 1,
      },
    },
  };

  const result = cloneDeep(data);

  expect(result.nest).toStrictEqual(data.nest);
  expect(result.nest === data.nest).toBeFalsy();

  expect(result.nest.deepNest).toStrictEqual(data.nest.deepNest);
  expect(result.nest.deepNest === data.nest.deepNest).toBeFalsy();
});
