# Version and package management

## General

TODO: plain `venv`,  `conda`, `poetry`, `pyenv`, `pyenv-virtualenv`, `pdm` comparison

## `conda` and `conda`-like

- `conda` is a package manager that also manages virtual environments.
- `mamba` is a faster drop-in replacement for `conda`.

They both have their full-fledged version and "mini" version, e.g. `anaconda` and `miniconda` / `mambaforge` and `miniforge`.

## Migrate  condainstallation to a different directory

At installation, it's possible to select the directory where the environment will be stored.

After installation:

1. Simply move the `$HOME/miniconda3` (default installation) to the new directory.
2. Open `/path/to/new/dir/miniconda3/condabin/conda` and change the `!/$HOME/miniconda3/python` to `!/path/to/new/dir/miniconda3/python`.
3. Run `/path/to/new/dir/miniconda3/condabin/conda init` to update the shell initialization script.

Usually this will be enough. If not, you might need to update the `PATH` variable in the shell initialization script.

### Use `libmamba` solver for `conda`

```bash
# need conda > 22.11
conda update -n base -c defaults conda
conda install -n base conda-libmamba-solver
conda config --set solver libmamba
```
