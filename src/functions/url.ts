export const getUrlWithoutQuery = (
  protocol = location.protocol,
  host = location.host,
  pathName = location.pathname
) => {
  return [protocol, "//", host, pathName].join("");
};
