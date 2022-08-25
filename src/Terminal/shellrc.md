# Shell-rc

## General

### Know if I'm in WSL or native Linux

Simply check the content of `/proc/version`. WSLs will contain "**Microsoft / microsoft**" somewhere in the kernel build version (which is very interesting to me lol).

On WSL (running **Ubuntu 18.04**):

```shell
$ cat /proc/version
Linux version 4.19.128-microsoft-standard (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP Tue Jun 23 12:58:10 UTC 2020
```

Also, on WSL with Kali Linux:

```shell
$ cat /proc/version
Linux version 4.4.0-22000-Microsoft (Microsoft@Microsoft.com) (gcc version 5.4.0 (GCC) ) #653-Microsoft Wed Apr 27 16:06:00 PST 2022
```

On native Linux (here **Debian 11 bullseye**)

```shell
$ cat /proc/version
Linux version 5.10.0-13-amd64 (debian-kernel@lists.debian.org) (gcc-10 (Debian 10.2.1-6) 10.2.1 20210110, GNU ld (GNU Binutils for Debian) 2.35.2) #1 SMP Debian 5.10.106-1 (2022-03-17)
```

## `.zshrc` specific contents

### `Home` and `End` wrongly captured by `zsh`

<https://stackoverflow.com/questions/8638012/fix-key-settings-home-end-insert-delete-in-zshrc-when-running-zsh-in-terminat>

> Run `cat` then press keys to see the codes your shortcut send and...

Add the key bindings to `~/.zshrc` using `bindkey`. For example:

```bash
bindkey  "^[[1~"  beginning-of-line
```
