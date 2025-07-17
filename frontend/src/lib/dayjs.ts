import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

export const timeDistance = (date: Date) => {
  return dayjs(date).fromNow();
};

export const formatDateStyle = (date: Date, style: string = "yyyy-mm-dd") => {
  return dayjs(date).format(style);
};

export { dayjs };
