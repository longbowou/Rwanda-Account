export const isProd = function() {
  return process.env.NODE_ENV === "production";
};

export const isDev = function() {
  return !isProd();
};
