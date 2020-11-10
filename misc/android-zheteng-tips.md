# Twiddling my Android device

## Uninstall pre-installed apps

### Requirements

1. 电脑装 `adb`
2. 手机开 developer mode
3. USB 线，用来连电脑

### Steps

1. 手机连电脑，`adb device` 测试连接情况

   ```shell
   $ adb devices
   * daemon not running; starting now at tcp:5037
   * daemon started successfully
   List of devices attached
   f75aea12        device
   ```

2. `adb shell` 进入手机的 shell

   ```shell
   $ adb shell
   sagit:/ $
   ```

3. `pm list packages` 列出所有安装包； 可以利用 `grep` 筛选包名，如：

   ```shell
   sagit:/ $ pm list packages | grep tips
   package:com.google.android.apps.tips
   ```

4. 利用 `pm uninstall` 删除安装包

   ```shell
   sagit:/ $ pm uninstall com.google.android.apps.tips
   Success
   ```

   如果产生 `Failure [DELETE_FAILED_INTERNAL_ERROR]` 可能是权限不足；此时可以使用 `user 0` （相当于 `root` 用户）进行删除

   ```shell
   sagit:/ $ pm uninstall com.google.android.apps.photos
   Failure [DELETE_FAILED_INTERNAL_ERROR]
   sagit:/ $ pm uninstall --user 0 com.google.android.apps.photos
   Success
   ```

   添加 `-k` option 还可以保留数据
