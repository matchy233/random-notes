# ssh config

* `$HOME/.ssh/config` -- personal configuration
* `/etc/ssh/ssh_config` -- global configuration

Format:

``` yaml
Host <alias>
    SSH_OPTION  value
```

## Common options

```yaml
Host * # match all hosts
    User matchy
    IdentityFile $HOME/.ssh/id_ed25519

Host cloud
    HostName dev.example.com
    # automatically use "matchy" as the User
    # automatically use id_ed25519 as the IdentityFile

Host dev
    HostName 147.47.233.45
    User mischa # overwrites User="matchy"
    Port 2333
    IdentityFile $HOME/.ssh/id_rsa # overwrites
```

## Jump/Bastion server make-easy

`ProxyJump` is available since **OpenSSH version 7.5**.

```diff
 Host bastion
     HostName transfer.example.com
     User matchy
     IdentityFile ~/.ssh/id_ed25519

 Host node
     HostName 192.168.50.233 # the intranet IP to the bastion
+    ForwardAgent yes
+    ProxyJump bastion
```

If your `ssh` is olderthan **OpenSSH 7.5** but newer than **OpenSSH 5.4** (assuming `bastion` config exists in the ssh config):

```diff
 Host node
     # ...
+    ProxyCommand ssh bastion -W [%h]:%p
```

If your `ssh` is even older than `OpenSSH 5.4`...

```diff
 Host node
     # ...
+    ProxyCommand ssh bastion nc -q0 %h %p 2> /dev/null
```

## Change starting directory

`RemoteCommand` is available since **OpenSSH version 7.5**.

```diff
 Host node
     # ...
+    RequestTTY force
+    RemoteCommand cd /path/to/your/directory && bash -l
```

The command `bash -l` means starting a `bash` session as the login shell. Alternatively, if you prefer `zsh` or `fish` (or any other shells), simply use `zsh -l` or `fish -l` instead.

## To Dos

- [ ] Avoid `broken pipe`
