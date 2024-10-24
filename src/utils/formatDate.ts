const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "short", // "Wed"
    day: "2-digit", // "09"
    month: "short", // "Oct"
    year: "numeric", // "2024"
  });
};

export default formatDate;
