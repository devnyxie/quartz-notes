---
tags:
  - c
  - unix
date: 2024-12-23
title: File Descriptors
---

![[attachments/Untitled-2025-01-08-0424.webp|550]]

A File Descriptor (fd) is a unique integer assigned by the kernel to represent an open file, socket, or other resource. Each process gets its own file descriptor table, which is a per-process array of file descriptors. The first three file descriptors are reserved for **standard input** (0), **standard output** (1), and **standard error** (2). Any other number is a file descriptor.

An independent file descriptor table is created for each process when it is initialized. When a process is created, it inherits the file descriptor table from its parent process. The file descriptor table is always initialized with the standard file descriptors: [`0`, `1`, `2`].

When a process opens a file, the kernel assigns the lowest available file descriptor to the file. The file descriptor is then stored in the file descriptor table of the process that opened the file: [... `3`].

<!-- !!! TODO: explain how System File Table and Inode are connected to all this -->
<!-- 1. **Process Calls `open()` or Equivalent**:
   - The process requests to open a file by calling a system call like `open()`.

2. **Kernel Interacts with the Inode Table**:
   - The kernel locates the file on the filesystem using its **path**.
   - It looks up the file's **inode** in the inode table to access the file's metadata (like permissions, type, and location on disk).
   - If the file doesn’t exist and the process requested `O_CREAT`, the kernel creates a new inode for the file.

3. **Kernel Updates the System-wide File Table**:
   - The kernel creates a new **entry** in the system-wide file table.
   - This entry includes:
     - The **inode reference** for the file.
     - **File offset**, initially set to 0.
     - **Access mode** and **flags** (e.g., `O_RDONLY`, `O_WRONLY`).
   - If the file is already open by another process, the kernel might reuse the existing system-wide file table entry, depending on the use case.

4. **Kernel Updates the Process's File Descriptor Table**:
   - The kernel finds the **lowest available index** in the process's **file descriptor table**.
   - It creates a new entry in the process's table that points to the new (or existing) **system-wide file table entry**. -->

```c
Index:  0   1   2   3
Points to: stdin, stdout, stderr, file.txt
```

> [!warning]
> The flow of acquiring file descriptors is not universal, and it may vary depending on the operating system. Even the concept of file descriptors may not be present in some operating systems.

# System Calls

File descriptors are an essential concept in Unix-like operating systems and are used in system calls like:

- `open()`: Opens a file and returns a file descriptor.
- `read()`: Reads data from a file using a file descriptor.
- `write()`: Writes data to a file using a file descriptor.
- `close()`: Closes a file and releases the file descriptor.

