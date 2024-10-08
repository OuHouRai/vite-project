import Mock from "mockjs"
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    //menuList用于后面做权限分配，也就是用户可以展示的菜单
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "项目管理",
              icon: "video-play",
              url: "mall",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "user",
            },
            {
              path: "/selected",
              name: "selected",
              label: "抽选管理",
              icon: "grid",
              url: "selected",
            },
            {
              path: "other",
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/pageOne",
                  name: "pageOne",
                  label: "页面1",
                  icon: "setting",
                  url: "pageOne",
                },
                {
                  path: "/pageTwo",
                  name: "pageTwo",
                  label: "页面2",
                  icon: "setting",
                  url: "pageTwo",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      }
    } else if (username === "wang" && password === "wang") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "home",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "user",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      }
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      }
    }
  },
}
