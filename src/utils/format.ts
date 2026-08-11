export const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-PH", { dateStyle: "long" })
    : "—";

export const capitalizeWord = (value: string | null | undefined) =>
  value ? value.replace(/\b\w/g, (char) => char.toUpperCase()) : "—";
