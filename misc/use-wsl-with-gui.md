# 在 WSL 用上 GUI 应用

## Xserver 安装

Windows 上的 Xserver 有好几个选择，我用的是 VcXsrv，安装时一路默认就可以了。

现在很多电脑都是高分屏 ，需要对 VcXsrv 做点设置不然字体会糊。

首先找到软件的安装路径，比如 `C:\Program Files\VcXsrv`，然后对两个可执行文件 vcxsrv.exe 和 xlaunch.exe 执行以下操作：

右键点击可执行文件， 进入 `Properties -> Compatibility -> Change high DPI settings -> High DPI scaling override`，选中 `Override high EPI scaling behavior`， 将 Scaling performed by 选项设为 Application 即可。

![](img/2020-11-11-16-52-53.png)

在开始菜单查找 xlaunch 并运行，一路默认就可以开启 Xserver。如果是 WSL2，记得还要关闭 access control。

## WSL 设置

### `DISPLAY` 设置

WSL2 不能直接 `export DISPLAY=localhost:0.0` 了， 而要使用 IP。可以这样一劳永逸：

```bash
export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
export LIBGL_ALWAYS_INDIRECT=1
```

### HiDPI 显示设置

```bash
export GDK_SCALE=1
export GDK_DPI_SCALE=1.5
```

### 大功告成！

设置好 `DISPLAY` 和 HiDPI 支援并开启 Xserver 之后就能运行 GUI 应用了。

可以拿 `xeyes` 测试一下：

```bash
sudo apt install x11-apps
xeyes
```

不出意外你就能看到熟悉的弱智小眼球了。

也能正常使用安装在 WSL 的 Sublime Text、CLion、IntelliJ IDEA 等等。

## JetBrains IDE 的调整

装了 JB 家的几个 IDE 之后发现没法即开即用，还要再配置点东西。

### Use Windows default browser

WSL 没有默认浏览器（当然），而 JB 家 IDE 的 markdown 渲染器依赖 JCEF，必须得有个浏览器。我们可以用 Windows 的浏览器：

打开 `Settings -> Tools -> Web Browsers`，将 `Default Browser` 的路径改为 `/mnt/c/path/to/your/browser/browser.exe` 即可。

### Resolve JCEF dependency issue

JCEF 有 `libcef.so` 和 `libjcef.so` 两个库，都有一大堆依赖。根据 event log 的报错安装一下就好了。我缺 `libXss` 和 `libgbm`：

```bash
sudo apt install libxss1 libgbm1
```
