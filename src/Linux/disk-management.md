# Disk Management

## Normal Disk Operations

### Add a disk

List the disk currently have in hand.
Or just `lsblk` will also do.

```shell
$ lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT
NAME         SIZE FSTYPE            TYPE  MOUNTPOINT
sda          256G                   disk
sdb          256G                   disk /
```

Format new disks.

```shell
$ mkfs -t ext4 /dev/sba
$ mkfs.ext4 /dev/sba
```

Mount the formatted disk to certain directory.

```shell
$ mount /dev/sba /mnt/sba
```

Add to `/etc/fstab` so that you don't need to mount it every time the device boots (how does it work?).

```shell
$ sudo bash -c 'echo "/dev/sba /mnt/sba ext4 defaults 0 0" >> /etc/fstab
```

Or use UUID.

```shell
$ UUID=$(sudo blkid | grep /dev/sba | cut -f2 -d ' ' | sed -e 's/\"//g')
$ sudo bash -c 'echo "${UUID} /mnt/sba ext4 defaults 0 0" >> /etc/fstab'
```

Or add a label to the disk and use the label to mount.

```shell
$ sudo e2label /dev/sba DISK1
sudo bash -c 'echo "LABEL=DISK1 /mnt/sba ext4 defaults 0 0" >> /etc/fstab'
```

### Optimize disk performance

Adjust the readahead value to increase IO performance

```shell
$ sudo blockdev /dev/sba
256
```

The readahead value is `<desired_readahead_bytes>` / 512 bytes.

For example, for an 8-MB readahead, 8 MB is 8388608 bytes (`8 * 1024 * 1024`).

```text
8388608 bytes / 512 bytes = 16384
```

Set blockdev to `16384` to havea 8-MB readahead.

```shell
sudo blockdev --setra 16384 /dev/sba
```

## RAID Operations

The best option to make a software RAID array is `mdadm`. You can get it from `apt` or other package manager.

```bash
$ sudo apt install mdadm
```

### Normal operations

Check RAID configuration

```bash
$ sudo mdadm --detail --scan
```

Check RAID operation progress / whether there is already a RAID array available

```bash
$ cat /proc/mdstat
Personalities : [linear] [multipath] [raid0] [raid1] [raid6] [raid5] [raid4] [raid10]
md0 : active raid5 nvme5n1[0] nvme7n1[2] nvme6n1[1] nvme8n1[4] nvme9n1[5]
      60011155456 blocks super 1.2 level 5, 512k chunk, algorithm 2 [5/5] [UUUUU]
      bitmap: 0/112 pages [0KB], 65536KB chunk

unused devices: <none>
```

### Create and resize a RAID array

**Create** a RAID5 disk array called `/dev/md0` with `/dev/sda` `/dev/sdb` and `/dev/sdc` (might take quite some time)

Note that actually a RAID5 disk array can only be named in the form of `/dev/md[0-9]+`

```bash
$ sudo mdadm --create --verbose /dev/md0 \
  --level=5 --raid-devices=3 /dev/sda /dev/sdb /dev/sdc
```

**Grow** a RAID5 disk array `/dev/md0` with 1 new disk called `/dev/sdd` (might take quite some time)

```bash
$ sudo mdadm --add /dev/md0 /dev/sdd
$ mdadm --grow --raid-devices=5 /dev/md0
```
