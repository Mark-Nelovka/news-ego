export default function FormateDate(dateWithBack: string) {
  const date = new Date(dateWithBack);
  const mounth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getDate = `${
    mounth[date.getMonth()]
  } ${date.getDate()}th, ${date.getFullYear()}`;

  return getDate;
}
