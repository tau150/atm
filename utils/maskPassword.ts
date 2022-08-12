export const maskPassword = (password: string): string => {
  const passLength = password.length;

  return new Array<string>(passLength).fill("*").join("");
};
