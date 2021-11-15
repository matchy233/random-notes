# 折腾实验室集群过程

## NIS 设定

### NIS master

1. 安装 NIS (之后都是 root 模式操作)

   ```shell
   $ sudo -i
   root# apt install nis
   ```

   会跳如下画面

   ```shell
    Preconfiguring packages ...

    # input your domain name
    +----------------------------| Configuring nis |----------------------------+
    | Please choose the NIS "domainname" for this system. If you want this      |
    | machine to just be a client, you should enter the name of the NIS domain  |
    | you wish to join.                                                         |
    |                                                                           |
    | Alternatively, if this machine is to be a NIS server, you can either      |
    | enter a new NIS "domainname" or the name of an existing NIS domain.       |
    |                                                                           |
    | NIS domain:                                                               |
    |                                                                           |
    | hulk.nis_________________________________________________________________ |
    |                                                                           |
    |                                  <Ok>                                     |
    |                                                                           |
    +---------------------------------------------------------------------------+
    ```

2. Edit `/etc/default/nis`

   ```shell
    #
    # /etc/defaults/nis     Configuration settings for the NIS daemons.
    #

    # Are we a NIS server and if so what kind (values: false, slave, master)?
    NISSERVER=false # Should be master
              ^^^^^
              Change this from false to master
   ```

3. Edit `/etc/hosts`

   ```shell
    192.168.1.233 hulk
   ```

4. Run `ypinit` to configure NIS

   ```shell
    root# /usr/lib/yp/ypinit -m

    At this point, we have to construct a list of the hosts which will run NIS
    servers.  hulk is in the list of NIS server hosts.  Please continue to add
    the names for the other hosts, one per line.  When you are done with the
    list, type a <control D>.
            next host to add:  hulk
            next host to add:
    The current list of NIS servers looks like this:

    hulk


    Is this correct?  [y/n: y]  y
    We need a few minutes to build the databases...
    Building /var/yp/hulk.nis/ypservers...
    Running /var/yp/Makefile...
    make[1]: Entering directory '/var/yp/hulk.nis'
    Updating passwd.byname...
    Updating passwd.byuid...
    Updating group.byname...
    Updating group.bygid...
    Updating hosts.byname...
    Updating hosts.byaddr...
    Updating rpc.byname...
    Updating rpc.bynumber...
    Updating services.byname...
    Updating services.byservicename...
    Updating netid.byname...
    Updating protocols.bynumber...
    Updating protocols.byname...
    Updating netgroup...
    Updating netgroup.byhost...
    Updating netgroup.byuser...
    Updating shadow.byname...
    make[1]: Leaving directory '/var/yp/hulk.nis'

    hulk has been set up as a NIS master server.

    Now you can run ypinit -s hulk on all slave server.
   ```

   有可能出现下面的错误

   ```shell
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating passwd.byuid...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating group.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating group.bygid...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating hosts.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating hosts.byaddr...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating rpc.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating rpc.bynumber...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating services.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating services.byservicename
    ...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating netid.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating protocols.bynumber...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating protocols.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating netgroup...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating netgroup.byhost...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating netgroup.byuser...
    failed to send 'clear' to local ypserv: RPC: Program not registeredUpdating shadow.byname...
    failed to send 'clear' to local ypserv: RPC: Program not registeredmake[1]: Leaving directory '/var/yp/hulk.nis'
   ```

   重启一下 `ypbind` 服务就能正常运作

   ```shell
   root# service ypbind restart
   ```

5. Import local users and groups

   ```shell
   make -C /var/yp
   ```

### NIS client

1. Also install NIS

    ```shell
    root# apt install nis
    ```

    During the process it will also prompt to enter domain. Use the **same** domain as the NIS master.

2. Add the following line to `/etc/yp.conf`

    ```shell
    domain hulk.nis 192.168.1.233 # server IP.
    ypserver 192.168.1.233
    # can also user the server hostname /etc/hosts
    ```

3. Edit `/etc/nsswitch.conf`. It's very important

```shell
 vim /etc/nsswitch.conf

 passwd:     compat nis      # line 7; add
 group:      compat nis      # add
 shadow:     compat nis      # add

 hosts:      files dns nis   # add
```

Debian buster 上还要 `ypbind` 广播(不会自动执行)

```shell
/usr/sbin/ypbind -broadcast
```

munge:

/etc/munge/ /var/log/munge /run/munge/ /var/lib/munge

暂时开启 /etc/ssh/sshd_config 里的 root 登录把 /etc/munge/munge.key 拷贝过去

scp -p root@... 这样

然后要装 gcc

slurm configure 最好是用 root, 不然容易出错

Failed to enable unit: Unit file /etc/systemd/system/slurmctld.service is masked.

Install munge 的时候要 install munge-dev (或者 libmunge-dev)，不然无法检测到 munge...然后只会编译 auth.none (auth munge not compiled)

写设置的时候不要忘记写 cgroup.conf

更新的话 ctld 有时候会 mask （unmaks 就行）

有时 slurmd 端口会已经监听（特别是更新 slurm）
ss 查看端口然后杀了


ahz10
Member

Registered: Apr 2005
Distribution: Fedora,Trustix,FreeBSD
Posts: 62

Rep: Reputation: 15
NIS client doesn't recognize user names

[Log in to get rid of this advertisement]
My NIS client doesn't recognize user names. Files that belong to NIS users are shown by their numeric id, not the account name.

When I do "chown davids davids" I get "invalid user."

However, running "ypcat passwd | grep davids" shows davids exists.

This happens on one client. I checked another client, which is fine, so the server should be OK.

Old 09-02-2005, 06:04 PM	  #2
clperrin
LQ Newbie

Registered: Sep 2005
Location: Fort Collins, CO
Distribution: Debian, mostly
Posts: 4

Rep: Reputation: 0
It "sounds" like your NIS client is checking local settings before NIS settings for user accounts. This can probably be edited to suit your needs in the /etc/nsswitch.conf

https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nfs-mount-on-ubuntu-16-04

https://unix.stackexchange.com/questions/13046/format-of-etc-hosts-on-linux-different-from-windows

https://stackoverflow.com/questions/30671292/running-rsync-as-root-operations-not-permitted/30717322

http://linux.vbird.org/linux_server/0600cluster.php

http://linux.vbird.org/linux_server/0430nis.php#nis_server

https://codeslake.github.io/ubuntu/nis/setting-up-NIS-for-ubuntuf

https://man7.org/linux/man-pages/man5/nsswitch.conf.5.html

https://wiki.fysik.dtu.dk/niflheim/Slurm_installation#munge-authentication-service

https://linuxize.com/post/check-listening-ports-linux/

https://github.com/nateGeorge/slurm_gpu_ubuntu/issues/2

https://www.digitalocean.com/community/tutorials/how-to-change-a-mariadb-data-directory-to-a-new-location-on-centos-7
