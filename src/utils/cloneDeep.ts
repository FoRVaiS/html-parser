// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cloneDeep = <T extends Record<string, any>>(obj: T): T => {
  if (typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(entry => (entry[1] && typeof entry[1] === 'object'
      ? [entry[0], { ...cloneDeep(entry[1]) }]
      : entry))) as T;
  }
  
  return obj;
};
