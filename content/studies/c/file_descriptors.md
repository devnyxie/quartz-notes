---
tags:
  - c
  - unix
date: 2024-12-23
title: File Descriptors
---

![[attachments/c/Pasted image 20250108043416.webp]]

A File Descriptor (fd) is a unique integer assigned by the kernel to represent an open file, socket, or other resource.

- `0` is **stdin** (standard input)
- `1` is **stdout** (standard output)
- `2` is **stderr** (standard error)
- Any other number is a file descriptor, which can be a file, a socket, or any other resource.

