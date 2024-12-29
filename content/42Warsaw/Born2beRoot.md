---
tags:
  - linux
  - sysadmin
date: 2024-12-25
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

> [!info]
> SSH (Secure Shell) is a protocol that allows you to securely connect to a remote server or device. It's commonly used for remote administration, file transfers, and tunneling.

Our task is to setup an SSH server on our virtual machine. This will allow us to connect to the VM remotely and perform administrative tasks. SSH Server should be running on port `4242` and it shouldn't be accessible from the root account.

## SSH Config

In order to do this, we need to edit the SSH configuration file located at `/etc/ssh/sshd_config`:

> [!info]
> You can login to your VM using the `user` or `root` account you created during installation. If you login as `user`, you can switch to the root account using `su`. When in sudo mode, you can skip the `sudo` command.

```bash
sudo nano /etc/ssh/sshd_config
```
1. Find the line that says `#Port 22` and change it to `Port 4242`. This will change the default SSH port from `22` to `4242`.
2. Find the line that says `#PermitRootLogin ...` and change it to `PermitRootLogin no`. This will prevent the root account from logging in via SSH.

Once done, save the file (CTRL+X, Y) and restart the SSH service:

```bash
sudo systemctl restart sshd
sudo systemctl status ssh
```

Now the port is changed and root login is disabled. Lets test it out by connecting to the VM via SSH.

## SSH Connection
![[port_forward.svg]]

### Port Forwarding
When using VirtualBox, you need to set up port forwarding to connect to the VM via SSH. Let's head over to the VM settings and add a new rule:
1. Go to VM's `Settings` -> `Network` -> `Advanced` -> `Port Forwarding`
2. Add a new rule with `Host Port` as `4242` and `Guest Port` as `2222`.

### Connecting
Now, you can connect to the VM using the following command:
```bash
ssh username@localhost -p 2222
```
*Replace `username` with the user you created during installation.*

> [!info]
> Explanation:
> - `ssh`: The command to connect to a remote server.
> - `username@localhost`: The username and hostname of the server you want to connect to. Since we're connecting to the VM on the same machine, we use `localhost` instead of an IP address.
> - `-p 2222`: Specifies the port to connect to. Since we've set up port forwarding, we connect to port `2222` on the host machine, which forwards to port `4242` on the Debian Virtual Machine.

> [!info]- Screenshots
>![[Pasted image 20241224130440.png]]

Congrats! You've successfully set up an SSH server and connected to your Debian Virtual Machine 🚀

# Firewall
Once you are logged into SSH, switch to the root user by typing: `su -`

To enhance the server's security, we'll set up a firewall using UFW (Uncomplicated Firewall). UFW is user-friendly and effective for managing firewall rules. Let's start by installing UFW:

`apt install ufw` | Installs UFW.

`ufw default deny incoming` | Blocks all incoming requests.

`ufw default allow outgoing` | Allows all outgoing requests.

`ufw allow 4242` | Allow incoming traffic on port `4242`. This is crucial to ensure you can still access your server via SSH.

`ufw enable` | Enables UFW.

# Sudo
The sudo program is a crucial tool for Linux, allowing users to execute commands with privileges of root (or another user).

To install, type: `apt install sudo`

Now, we'll adjust the sudo settings. Type `visudo` to open the configuration file.

Add the following lines:

`Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"` | Limits the paths that can be used by sudo to run commands. This setting is already there and you can leave it as it is.

`Defaults requiretty` | Requires TTY to use sudo.

`Defaults badpass_message="WRONG PASSWORD"` | Displays a custom message when using a wrong password with sudo.

`Defaults logfile="/var/log/sudo/sudo.log"` | Sets the input logs file.

`Defaults log_input` | Logs input.

`Defaults log_output` | Logs output.

`Defaults iolog_dir=/var/log/sudo` | Sets the directory to save additional output and input logs.

`Defaults passwd_tries=3` | Limits connection attempts using sudo.

# Groups
We need to add our user to the `user42` and `sudo` groups as specified in the born2beroot requirements.

`groupadd user42` | Adds the `user42` group.

`usermod -a -G user42,sudo chlimous` | Adds the `chlimous` user to the `user42` and `sudo` groups.

To verify the changes, you can check the `/etc/group` file: `cat /etc/group`

Now that your user has been added to the sudo group, he can execute commands using `sudo`, elevating his permissions to perform administrative tasks.

# Password Policy
Go to the `/etc/login.defs` configuration file and modify the following lines:

`PASS_MAX_DAYS 30` | Makes the password expire every 30 days.

`PASS_MIN_DAYS 2` | Minimum number of days before the modification of a password.

`PASS_WARN_AGE 7` | Number of days warning given before a password expires. You can leave it as it is.

Now we need to ensure the policy changes we've made are applied to our current users:

`chage -M 30 chlimous` | Sets `PASS_MAX_DAYS` to `30` days for user `chlimous`.

`chage -m 2 chlimous` | Sets `PASS_MIN_DAYS` to `2` days for user `chlimous`.

Apply these changes for user and root by saving the file.

---

To strengthten the password policy, we will utilize a module called pwquality:
```bash
apt install libpam-pwquality
```
Then, access /etc/pam.d/common-password configuration file to set the password rules.

Change:

`password requisite pam_pwquality.so retry=3`

to:

`password requisite pam_pwquality.so retry=3 minlen=10 difok=7 maxrepeat=3 dcredit=-1 ucredit=-1 lcredit=-1 reject_username enforce_for_root`

Details:

`retry` | Maximum amount of incorrect attempts.

`minlen` | Minimum acceptable size for the new password.

`difok` | Number of characters in the new password that must not be present in the old password. Even with enforce_for_root, this rule doesn't apply to the root user since the old password is not required to change it.

`maxrepeat` | The maximum number of allowed same consecutive characters in the new password.

`dcredit` | Minimum number of digits in the new password. (negative value)

`ucredit` | Minimum number of uppercase characters in the new password. (negative value)

`lcredit` | Minimum number of lowercase characters in the new password. (negative value)

`reject_username` | The new password cannot include the username.

`enforce_for_root` | Applies rules to root.


Save the file in order to enforce the rules and update the passwords for both your user account and the root account:

```bash
passwd devnyxie #Changes the password of the devnyxie user
passwd root
```

# Monitoring
The final task is to set up a monitoring script that will log the CPU and memory usage of the system every 10 minutes. The script should run in the background and log the data to a file.

Create a script file named `monitoring.sh` in the `/root` directory:

```bash
nano monitoring.sh
```

Write your own script or use the following template (bad choice, RTFM):
```bash
#!/bin/bash

```