export const formatDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-PH", { dateStyle: "long" })
    : "—";

export const formatCurrentMonthYear = () =>
  new Date().toLocaleDateString("en-PH", {
    month: "short",
    year: "numeric",
  });

export const formatCurrentYear = () => new Date().getFullYear().toString();

export const formatWord = (value: string | null | undefined) => {
  if (!value) return "—";

  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

export const formatCurrency = (amount?: number | null) =>
  amount != null
    ? new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount)
    : "—";
