import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

export const timeDistance = (date: Date) => {
  return dayjs(date).fromNow();
};

export { dayjs };
