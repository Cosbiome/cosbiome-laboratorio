export const handleParseInput = (
  keys: string[],
  requireds: boolean[],
  type: string[],
  options: string[][]
): { key: string; redired: boolean; type: string; options: string[] }[] => {
  return keys.map((k, index) => ({
    key: k,
    redired: requireds[index],
    type: type[index],
    options: options[index],
  }));
};
