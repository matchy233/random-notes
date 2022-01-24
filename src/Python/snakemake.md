# Snakemake

## `Snakefile` 格式

```python
rule <rule-name>:
    input:
        input1
        input2
    output:
        output
    run:
    # ...
```

## 执行

```shell
$ snakemake <rule-name> --cores <core-num>
```
