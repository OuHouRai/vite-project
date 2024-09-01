const env = import.meta.env.MODE || "prod";

const ENVConfig = {
  development: {
    baseApi: "/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
  test: {
    baseApi: "/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
  prod: {
    baseApi: "/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
};

export default {
  env,
  ...ENVConfig[env],
  mock: false,
};
