"use server";

export async function isOlderThanAdayAgo(time: string | number | Date) {
  const nowInMs = new Date().getTime();
  const timeInMs = new Date(time).getTime();
  const daysAgo = (nowInMs - timeInMs) / (1000 * 60 * 60 * 24);
  return daysAgo < 1;
}

export async function getRelativeTime(time: string | number | Date) {
  const now = new Date();
  const then = new Date(time);
  // Get the difference in milliseconds
  const diffInMs = now.getTime() - then.getTime();

  // Now you can perform calculations using diffInMs which is a number
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
