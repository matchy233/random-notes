# VSCode tips

## Platform specific settings

I asked the following questions in my personal Telegram group one day...

![incentive](img/paltform_specific_settings.png)

And my friend [FluorineDog](https://github.com/FluorineDog) enlightened me that [the `${env:variable}` syntax](https://code.visualstudio.com/docs/editor/variables-reference#_environment-variables) could be a workaround.

E.g. create an environment varaible in the name of `EXE_HOME` and use the platform-specific executable in the form of `${env:EXE_HOME}/<executable>`.

### But that's not necessary for LaTeX workshop...

But I actually only want to solve the compilation problem of my $\LaTeX$ workshop: I sometimes compile locally on my personal laptop, which has ; and sometimes on a server w/ Debian 11. The solution for my problem is actually simple: **set up `TEXMFHOME` on each machine**.

To be specific, add the following line in your `.bashrc` or `.zshrc` or `.whatever-rc`:

```bash
export TEXMFHOME="/path/to/your/latexmk"
```
