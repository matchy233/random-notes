# Git (not 101)

## Troubleshooting

### `git pull` stuck at "Receiving objects"/"Unpacking objects"

```bash
git fsck && git gc --prune=now
```

Or if on Windows 11:

```powershell
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
```

i.e. use the built-in `ssh.exe` instead of the one packaged with Git for Windows.

Also see [gpg](gpg.md#trouble-shooting) - trouble shooting chapter for gpg signing related issues.

Basically, **things shipped with Git for Windows are evil**, always consider using the system default / your customed download!

## Bibliography

1. [ssh - Git fetch/pull/clone hangs on receiving objects - Stack Overflow](https://stackoverflow.com/questions/11941175/git-fetch-pull-clone-hangs-on-receiving-objects)
2. [github - git stuck on Unpacking Objects phase - Stack Overflow](https://stackoverflow.com/questions/7731785/git-stuck-on-unpacking-objects-phase)
