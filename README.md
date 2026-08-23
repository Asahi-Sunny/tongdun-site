# 童盾智伴网站部署包

这是 GitHub Pages 静态部署包。解压后把本文件夹内的全部内容上传到 GitHub 仓库根目录即可。

## 文件结构

```text
index.html
report.html
styles.css
script.js
report.js
assets/
```

## GitHub Pages 部署

1. 新建一个公开 GitHub 仓库。
2. 上传本文件夹内的全部文件到仓库根目录。
3. 进入仓库 Settings -> Pages。
4. Source 选择 Deploy from a branch。
5. Branch 选择 main，目录选择 /root。
6. 保存后等待 GitHub 生成访问地址。

## 注意

- 不要上传项目申报书 Word/PDF，里面可能包含个人联系方式。
- 录音识别和朗读依赖访问者浏览器支持，并需要用户允许麦克风权限。
- 学习记录保存在访问者自己的浏览器 localStorage 中，不会上传到服务器。
