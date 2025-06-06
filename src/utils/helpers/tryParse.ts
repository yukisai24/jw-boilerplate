export const tryParse = (str: string, index?: number): boolean => {
  try {
    return !!JSON.parse(str);
  } catch (err) {
    index !== undefined && console.log('error description at: ', index);
    return false;
  }
};
