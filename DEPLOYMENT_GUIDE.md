# 酒桌游戏合集 - GitHub Pages部署指南

本指南将帮助您将酒桌游戏合集项目部署到GitHub Pages，以获得一个永久的外网可访问链接。

## 部署步骤

### 1. 在GitHub上创建仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `drinking-games-collection`（或您喜欢的名称）
   - Description: `酒桌游戏合集 - 一个适合在酒桌上玩的各种小游戏合集`
   - 选择 Public（公共仓库）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2. 初始化本地仓库

在您的本地项目目录中打开终端，执行以下命令：

```bash
cd /workspace
```

如果项目还没有初始化git仓库（我们已经有了），执行：

```bash
git init
```

### 3. 添加文件并提交

```bash
git add .
git commit -m "Initial commit"
```

### 4. 连接到GitHub仓库

将以下命令中的 `YOUR_USERNAME` 替换为您的GitHub用户名：

```bash
git remote add origin https://github.com/YOUR_USERNAME/drinking-games-collection.git
```

### 5. 推送到GitHub

```bash
git branch -M main
git push -u origin main
```

如果您之前有commit，可以使用：

```bash
git push -u origin main --force
```

### 6. 启用GitHub Pages

1. 访问您的GitHub仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到并点击 "Pages"
4. 在 "Build and deployment" 部分：
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 `main` 分支
   - Folder: 选择 `/ (root)`
5. 点击 "Save"

### 7. 访问您的网站

GitHub Pages需要几分钟时间来部署。部署完成后，您可以通过以下链接访问：

```
https://YOUR_USERNAME.github.io/drinking-games-collection/
```

将 `YOUR_USERNAME` 替换为您的GitHub用户名。

## 其他部署选项

### 使用Vercel部署

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账户登录
3. 点击 "New Project"
4. 选择您的仓库
5. 点击 "Deploy"
6. 几秒钟后，您将获得一个Vercel链接

### 使用Netlify部署

1. 访问 [Netlify](https://www.netlify.com)
2. 使用GitHub账户登录
3. 点击 "Add new site" → "Import an existing project"
4. 连接到GitHub
5. 选择您的仓库
6. 点击 "Deploy site"
7. 几秒钟后，您将获得一个Netlify链接

## 更新网站

当您对项目进行修改后，只需执行以下命令即可更新网站：

```bash
git add .
git commit -m "描述您的更改"
git push
```

GitHub Pages会自动重新部署您的网站。

## 注意事项

- GitHub Pages免费计划仅支持公共仓库
- 部署可能需要1-5分钟时间
- 您可以在仓库的 "Settings" → "Pages" 页面查看部署状态
- 如果需要自定义域名，可以在GitHub Pages设置中配置

祝您使用愉快！🍻
