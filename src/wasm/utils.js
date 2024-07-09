/**
 * Get an object with the given names from the given object.
 */
export const getImportObject = (obj, names) =>
  names.reduce((result, name) => {
    result[name] = obj[name].bind(obj);
    return result;
  }, {});

/**
 * Read a string from a Uint8Array.
 */
export const readStr = (u8, o, len = -1) => {
  const end = len === -1 ? u8.length : o + len;
  return String.fromCharCode(...u8.slice(o, end).filter(byte => byte !== 0));
};

export const ESUCCESS = 0;
