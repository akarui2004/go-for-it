export const numberOrZero = (input?: any) => {
  switch (typeof input) {
    case "number": return input;
    default:
      return isNumber(input) ? Number(input) : 0;
  }
}

export const isNumber = (input: any): boolean => {
  return !isNaN(input) && isFinite(input);
}
