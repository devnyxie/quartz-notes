---
tags:
  - c
  - unix
date: 2025-03-08
title: errno in C
description: Learn how to use the errno variable in C to handle errors.
---

The `errno` is a global variable that is set by system calls and some library functions in the event of an error to indicate what went wrong. It is defined in the `<errno.h>` header file. The `errno` is set to zero at program startup, and any function that fails will set it to a nonzero value.

For example, after calling `access()` function for a file that doesn't exist, the `errno` will be set to `ENOENT` (meaning "No such file or directory") which is defined in the `<errno.h>` header file. You can check its value and get a human-readable message using `perror()` or `strerror(errno)`.

```c
if (access("nonexistent_file.txt", F_OK) == -1) {
    perror("Error");
    printf("errno: %d\n", errno);
}
```

Output:

```shell
Error: No such file or directory # (ENOENT)
errno: 2 # (ENOENT)
```