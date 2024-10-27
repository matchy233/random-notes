# Version and package management

## General

TODO: plain `venv`,  `conda`, `poetry`, `pyenv`, `pyenv-virtualenv`, `pdm` comparison

## `conda` and `conda`-like

- `conda` is a package manager that also manages virtual environments.
- `mamba` is a faster drop-in replacement for `conda`.

They both have their full-fledged version and "mini" version, e.g. `anaconda` and `miniconda` / `mambaforge` and `miniforge`.

### Use `libmamba` solver for `conda`

```bash
# need conda > 22.11
conda update -n base -c defaults conda
conda install -n base conda-libmamba-solver
conda config --set solver libmamba
```
