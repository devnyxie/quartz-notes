---
title: "TMUX: Terminal Multiplexer" 
tags:
  - unix
  - sysadmin
date: 2025-02-16
---

# Introduction
TMUX is a terminal multiplexer that allows you to run multiple terminal sessions in a single window. It's a great tool for sysadmins, developers, and anyone who works in the terminal. In this study, we'll learn how to use TMUX and some of its basic features.
![[attachments/Pasted image 20250216223253.png]]
Let's imagine the following scenario: you're working on a server via SSH, and you need to run multiple commands at the same time. You could open multiple SSH sessions, but that can get messy. With TMUX, you can create multiple panes in a single window and run different commands in each pane.

The flow is simple: you open a TMUX session, create panes, and run commands in each pane. You can also detach from a session and reattach later. This is great for long-running processes that you want to keep running even if you disconnect from the server. You can switch between panes, whole sessions, and even share sessions with other users over the network. But how?

# Installation

You can install TMUX on most Linux distributions using any package manager. For example, on Ubuntu, you can run:

```bash
sudo apt-get update && sudo apt-get install tmux
```

# Basic Usage

Let's follow the mentioned scenario and create a TMUX session in order to manage multiple services.

## Starting a Session

To start a new TMUX session, you can run:

```bash
tmux new -s mysession
```

This will create a new session named `mysession`. You can name your sessions to keep track of them, or you can obit the `-s` flag to create a session without a name.

## Panes
### Creating Panes

Once you're in a session, you can create panes by splitting the window horizontally or vertically. You can split the window horizontally by pressing `Ctrl + b` followed by `%`, or vertically by pressing `Ctrl + b` followed by `"`.

> [!info] 
> `Ctrl + b` is the default prefix key for TMUX. This means that you need to press `Ctrl + b` before any other command in TMUX.

### Switching Between Panes

You can switch between panes by pressing `Ctrl + b` followed by an arrow key in the direction you want to move. For example, to move to the pane on the right, you can press `Ctrl + b` followed by `→`. Or, you can switch between panes by pressing `Ctrl + b` followed by `o` or `;`.

## Detaching and Reattaching

To detach from a session, you can press `Ctrl + b` followed by `d`. This will detach you from the session, but the session will keep running in the background. You can reattach to the session later by running:


```bash
tmux attach -t session_name
# or, if you didn't name your session, you can connect by index:
tmux ls
0: 1 windows (created Sun Feb 16 16:22:09 2025)
2: 1 windows (created Sun Feb 16 18:07:05 2025)
tmux attach -t 0 # to attach to the first session
```

## Switching Between Sessions

You can switch between sessions by pressing `Ctrl + b` followed by `w`. This will show you a list of all the sessions you have running, and you can select the one you want to switch to.

## Sharing Sessions

You can share a TMUX session with other users over the network. This is great for pair programming or getting help from a colleague. To share a session, you can run:

```bash
tmux -S /tmp/shared_session attach
```

This will create a shared session that other users can connect to by running the same command. You will be seeing his interactions in real-time, and you can also share control over the session ✨

# Conclusion

TMUX is a powerful tool that can help you manage multiple terminal sessions in a single window, and it is absolutely essential for anyone who works with servers or in the terminal. I hope I've has given you a good introduction to TMUX and its basic features `:D`