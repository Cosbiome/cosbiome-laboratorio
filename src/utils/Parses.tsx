export const handleParseInput = (
  keys: string[],
  requireds: boolean[],
  type: string[],
  options: { value: string; nombre: string }[][]
): {
  key: string;
  redired: boolean;
  type: string;
  options: { value: string; nombre: string }[];
}[] => {
  return keys.map((k, index) => ({
    key: k,
    redired: requireds[index],
    type: type[index],
    options: options[index],
  }));
};
