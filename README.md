# Blog-Project-Vue
## 介绍
一个简单的博客页面，基于mysql,express和Vue3搭建
## 功能
游客：浏览博文列表，查看博文详情，基于标题和内容关键字搜索，基于分类过滤

登录后切换为管理员身份
管理员：进入管理后台，可对博文和分类增删改查

## mysql数据库结构
在‘/server/db/DbUtils.js/’中
与数据库建立链接的代码如下：

![image](https://user-images.githubusercontent.com/102190949/182211686-881601b7-c398-46b1-9f20-7584e0f7f580.png)

有三张表，分别为admin,blog,category

admin:
![image](https://user-images.githubusercontent.com/102190949/182211188-c751ec7c-63ae-49b5-b5ed-42d55ba8b50b.png)

blog:
![image](https://user-images.githubusercontent.com/102190949/182211331-220dca0a-bdcc-4079-9102-0eb3dfc31430.png)

category:
![image](https://user-images.githubusercontent.com/102190949/182211420-b9487717-dfef-47d9-b881-81ff21bfb009.png)

