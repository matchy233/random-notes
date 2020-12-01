# 修理 hexo-douban

在新博客使用了 [`hexo-douban`](https://github.com/mythsman/hexo-douban) 这个库，想展示自己的豆瓣阅读、观影等等。但是生成的豆瓣页在 Fluid 主题下图片显示有点问题，需要手动改 `css` 来解决；同时装了 `bluebird` 又检测到几处 `TypeError`，需要修改 `js` 源码。
原作者已经没有精力维护这个库了，`npm` 肯定不会更新，而我又依赖 GitHub Actions 来部署。如何应用自己的手动修改是个问题。

## 使用 `patch-package` 给包打补丁

这里推荐个小工具 [patch-package](https://www.npmjs.com/package/patch-package)。就是给依赖库打个补丁，不影响依赖库正常升级，只是涉及到你修改的内容会用你的补丁替换。

直接在依赖库中编辑修复有 bug 的文件，然后该工具会生成个临时文件夹存放对应版本的依赖库，然后和你修改的依赖库目录去进行比较，生成一个 patch 文件，下次在执行 `npm install` 时，该工具会将该 patch 合进该依赖库去。

## 具体操作步骤

1. 项目的根目录 `package.json` 下，添加 `npm postinstall`, 以便每次执行 `npm install` 时能合进所有的patch文件：

   ```json
   "scripts": {
      ...
   +  "postinstall": "patch-package"
      ...
   }
   ```

2. 安装 `patch-package`

   ```bash
   npm i patch-package --save
   ```

3. 编辑依赖库 `<package-name>`, 并执行下面命令生成 patch 文件

   ```bash
   npx patch-package <package-name>
   ```

4. 再执行以下命令，你就发现最新安装的包已经合进了你刚刚修改的 patch 文件了

   ```bash
   npm install
   ```

## Reference

1. [JeanZhao: 修改node_modules中依赖库](https://juejin.im/post/6844904165328551944)
