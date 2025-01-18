---
title: Inode Table
tags:
  - unix
  - filesystems
date: 2024-01-18
---

# What is an Inode Table?

An inode (index node) table is a data structure in Unix-like file systems that stores key information about each file, except its name and data. Think of it as a database that the filesystem uses to keep track of file metadata and data block locations.

# Structure

Each inode contains:
- File type (regular file, directory, symbolic link, etc.)
- File permissions (e.g., 0777)
- Owner and group IDs 
- File size
- Timestamps (access, modification, change)
- Number of hard links
- Location of the file's data blocks
- Other metadata

# How it Works

When you create a file:
1. The system allocates an inode
2. Directory entry links filename to inode number
3. File metadata gets stored in the inode
4. Data block locations are recorded in the inode

> [!info]
> Every file has exactly one inode but can have multiple directory entries (hard links) pointing to it. The inode number uniquely identifies a file within a filesystem.

# Key Concepts

- **Inode Number**: A unique identifier for each file
- **Directory Entry**: Maps filenames to inode numbers
- **Hard Links**: Multiple directory entries pointing to same inode
- **Soft Links**: Special files containing paths to other files
- **Block Pointers**: Track file data locations on disk

# Example Output

View inode information for a file using `ls -i`:

```bash
ls -i file.txt
# Output: 1234567 file.txt
```