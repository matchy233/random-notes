# General Python-related notes

## Cannot pickle `TextIOWrapper` objects

Do not use `multiprocessing` in combination with `tqdm`. Turns out the `tqdm` progress bar is not picklable.
