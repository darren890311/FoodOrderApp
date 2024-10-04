export const calculateItemTotal = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[],
  price: number,
  quantity: number
) => {
  const totalFields = fields.reduce((acc, field) => acc + field.price, 0);
  return (price + totalFields) * quantity;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateOrderSubtotal = (lines: any[]) =>
  lines.reduce(
    (acc, line) =>
      acc + calculateItemTotal(line.value, line.price, line.quantity),
    0 as number
  );
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateOrderText = (lines: any[], taxPercentage: number) =>
  calculateOrderSubtotal(lines) * (taxPercentage / 100);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateOrderTotal = (lines: any[], taxPercentage: number) =>
  calculateOrderSubtotal(lines) + calculateOrderText(lines, taxPercentage);
