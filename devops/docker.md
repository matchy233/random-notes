# 关于 `Docker` 使用的个人笔记

## 不使用 `sudo` 运行 `docker`

**TL; DR**: 创建 `docker` 用户组并把当前用户添加至 `docker` 用户组即可

感觉自己该学一下 Linux 用户/用户组相关知识。

### 步骤

Create the docker group.

```bash
sudo groupadd docker
```

Add your user to the docker group.

```bash
sudo usermod -aG docker ${USER}
```

You would need to log out and log back in so that your group membership is re-evaluated or type the following command

```bash
su -s ${USER}
```

Verify that you can run docker commands without sudo.

```bash
docker run hello-world
```
