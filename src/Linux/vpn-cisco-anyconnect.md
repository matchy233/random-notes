# VPN via Cisco Anyconnect

I always work on a remote server, and I need to connect to the university network to access some resources and do homework submission. Hence I need to set up a VPN nn that server (where I have `sudo` rights)

## Setting up Unibas VPN

Download [Linux VPN Client](https://its.unibas.ch/de/anleitungen/netzwerkzugang/anleitung-vpn/) with:

```bash
$ wget --user <unibas-long-username> --password <unibas-password> \
  https://data.its.unibas.ch/extern/vpn/Linux/anyconnect-linux64-4.10.06079-core-vpn-webdeploy-k9.sh
```

As instructed, run the script with `sudo`:

```bash
$ sudo chmod +x anyconnect-linux64-4.10.06079-core-vpn-webdeploy-k9.sh
$ sudo ./anyconnect-linux64-4.10.06079-core-vpn-webdeploy-k9.sh
```

Cisco VPN client will be installed to `/opt/cisco/anyconnect/`.

Initially tried `/opt/cisco/anyconnect/bin/vpn connect vpn.mobile.unibas.ch`, but the **required authentication method is not supported for CLI**.

The tried Remote Desktop + the GUI client. But was prompted:

```text
VPN establishment capability for a remote user is disabled.
A VPN connection will not be established.
```

It's because inside the profile of cisco anyconnect the VPN establishment is configured to `LocalUserOnly` (for Linux if you install to the default path, the configuration `xml` file will locate in `/opt/cisco/anycconnect/profile/`).

```xml
<WindowsVPNEstablishment>LocalUserOnly</WindowsVPNEstablishment>
<LinuxVPNEstablishment>LocalUserOnly</LinuxVPNEstablishment>
```

Change it to `AllowRemoteUsers` will solve the problem. But Cisco will *always* re-write the configuration file to `LocalUserOnly` after you close the GUI client. So it is necessary to watch the file and re-write it back to `AllowRemoteUsers` after it is changed.

## Hack Cisco AnyConnect VPN's configuration

TODO

## Ref

[How to enable (and hack) Cisco AnyConnect VPN through Remote Desktop](https://blog.expta.com/2020/04/how-to-enable-cisco-anyconnect-vpn.html)
