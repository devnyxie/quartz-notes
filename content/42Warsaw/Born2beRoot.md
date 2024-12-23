---
tags:
  - linux
  - sysadmin
date: 2024-12-23
---
![[attachments/Pasted image 20241223071739.webp|100]]

The **Born2beRoot** project is a system administration exercise that introduces virtualization concepts. You will create a virtual machine using VirtualBox or UTM, set up a server with Debian or Rocky Linux, and follow strict configurations, including strong password policies, sudo rules, and a monitoring script. The mandatory tasks include configuring encrypted partitions, a secured SSH service, and a firewall.

The **bonus** involves setting up additional features, like **advanced partitioning**, a **WordPress website** with specific services, or another functional service of your choice. However, bonus evaluation requires the mandatory part to be <u>flawless</u>.

# Download the Debian ISO
Visit the [Debian download page](https://www.debian.org/distrib/) and download the latest stable version of a 64-bit small installation image (e.g., `debian-12.8.0-amd64-netinst.iso`).
> [!info]
> The minimal installation image is recommended for this project, since we don't need a full Desktop Environment.

# Create a New VM

1. Open **VirtualBox** and click **New**.
2. Name the virtual machine (e.g., `Born2beRootVM`).
3. Leave the **Folder** as the default location.
4. Choose the ISO Image you downloaded.
5. Make sure to check `Skip Unattended Installation` in order to set up the VM manually.


# Installation

## Booting up

Now that our virtual machine is ready, the next step is to install the operating system, much like you would on a regular conputer.

Click "Start" on your Virtualbox interface. Select "Install" and then follow the on-screen instructions. The installation process is quite straightforward, especially when compared to more complex distributions like Arch or Gentoo. If you've ever tried installing those, you'll find Debian notably easier.

> [!info]- Screenshots
> ![[attachments/Screenshot from 2024-12-23 07-24-21.webp|600]]

Set the hostname as your login followed by 42, as required by the project guidelines. This is the name of your device on the local network. Skip domain name configuration. Set a password for root. Make a user with your login and set a password for this account.

## Partitioning

It's time to partition our disk. 

Mandatory part requires default partitioning:
- `/` (root)
  In this case, `/var`, `/tmp`, `srv` and `/home` are all part of the root partition.
- `/home` (user data)
- `/swap` (swap space for RAM)

Bonus part requires separated partitions:
- `/` (root)
- `/home` (user data)
- `/swap` (swap space for RAM)
- `/var` (variable data)
- `/var/log` (log files)
- `/srv` (data served by the system)
- `/tmp` (temporary files)

> [!info]
> Separating these partitions is usually a good idea for <u>security</u> reasons.
>
> **/var**: This directory contains log files, databases, and other variable data. By separating it, you can apply different mount options or encryption. For example, you could limit the size of the /var partition to avoid logs or caches from filling up the entire disk, potentially breaking the system.
>
> **/tmp**: This directory holds temporary files that applications and the system create. It’s a common place for exploits (like symlink attacks or temp file attacks). Putting it in its own partition allows you to mount it with secure options like noexec or nosuid to mitigate risks from malicious code in temporary files.
> 
> Also, by isolating different parts of the filesystem (especially `/tmp`, which can be used heavily during operations), you can optimize disk I/O performance for each partition. For example, if `/tmp` fills up due to a large process creating temp files, it won't affect `/home` or `/var`.

We will go straight to the bonus part and set up the separated partitions.

Select "Guided - use entire disk and set up encrypted LVM" then select "Separate /home, /var and /tmp partitions". This setup is crucial for completing the bonus part of born2beroot.


Set a password. With this, even if the police raid my home, they won't get to my data unless they break my (super weak) password. 🥸 

> [!info]- Screenshots
> ![[attachments/Screenshot from 2024-12-23 08-49-34.webp|700]]
> ![[attachments/Screenshot from 2024-12-23 08-49-57.webp|700]]
> ![[attachments/Pasted image 20241223085721.webp]]
> Adjust the volume group size in guided partitioning to carve out space for a couple more logical volumes.
> ![[attachments/Screenshot from 2024-12-23 09-03-56-1.webp]]



Head over to "Configure the Logical Volume Manager", and make two logical volumes: `srv` and `var-log`. Set them both as "Ext4 journaling file system" and mount them respectively to `/srv` and `/var/log`.

> [!info]- Screenshots
> ![[attachments/Pasted image 20241223091041.webp]]

### srv
> [!info]
> What is `/srv`? It's a directory that is used to store data served by the system. For example, if you have a web server, you might store your website files in `/srv/www`.

> [!info]- Screenshots
> ![[attachments/Pasted image 20241223091323.webp]]
> ![[attachments/Pasted image 20241223091345.webp]]
> ![[attachments/Pasted image 20241223091415.webp]]
> Let's allocate `4000mb` for `/srv`:
> ![[attachments/Pasted image 20241223091438.webp]]



### var-log
> [!info]
> What is `/var/log`? It's a directory that contains log files generated by the system and applications. 
> Common log files include:
> - `/var/log/syslog`: General system logs
> - `/var/log/auth.log`: Authentication logs
> - `/var/log/dpkg.log`: Package management logs
> And many more...

Repeat the same process for `/var/log`, but name it `var-log` and allocate `1950mb` of space.

## Format and Mount the Partitions
Alright. The volumes are created now:
- `4000mb` for `/srv`
- `1950mb` for `/var/log`

But in order to use them, we need to format (`ext4` format) and mount them. In short, the system needs to know where these partitions are and how to access them.

> [!info]- Screenshots
> `srv`:
> ![[attachments/Pasted image 20241223092332.webp]]
> ![[attachments/Pasted image 20241223102240.webp]]
> ![[attachments/Pasted image 20241223102255.webp]]
> ![[attachments/Pasted image 20241223102319.webp]]
> ![[attachments/Pasted image 20241223102332.webp]]
> ![[attachments/Pasted image 20241223102352.webp]]

Repeat the same process for `/var/log`:
- Format it as `ext4`
- Mount it to `/var/log` (enter manually)

> [!info]- Screenshots
> ![[attachments/Pasted image 20241223102843.webp]]

Seems like we're done with partitioning. Let's move on to the next step.
## Extra Settings
### Installation Media Scan
Avoid scanning for extra installation media
> [!info]- Screenshots
> ![[attachments/Pasted image 20241223105600.webp]]
### Country
Select your country from the list
> [!info]- Screenshots
> ![[attachments/Pasted image 20241223105711.webp]]
### Mirror
Select the default Debian archive mirror
> [!info]- Screenshots
> ![[attachments/Pasted image 20241223105747.webp]]
### HTTP Proxy
Leave it blank `:)`
> [!info]- Screenshots
> ![[attachments/Pasted image 20241223105916.webp]]

### Software Selection
Choose only the `SSH server` and `standard system utilities`. Use space to check/uncheck.

### Grub Boot Loader
Install the GRUB boot loader to the master boot record. This is the default option.

> [!info]- Screenshots
> ![[attachments/Pasted image 20241223113440.webp]]
> ![[attachments/Pasted image 20241223113747.webp]]
> ![[attachments/Pasted image 20241223121041.webp]]

And just like that, we're done installing. 🎉
# Setting up SSH