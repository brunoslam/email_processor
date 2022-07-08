import { emails } from "../data";

export const getEmail = () => {
  // Use this function as email source. Assume it as infinite email pools since the email data has no id.
  return emails[Math.floor(Math.random() * emails.length)];
};
