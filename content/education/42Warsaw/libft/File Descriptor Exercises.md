---
tags:
  - C
  - libft
date: 2024-12-23
title: FD Exercises
---

> [!info]
> A File Descriptor (fd) is a unique integer assigned by the kernel to represent an open file, socket, or other resource.
> - `0` is **stdin** (standard input)
> - `1` is **stdout** (standard output)
> - `2` is **stderr** (standard error)

## ft_putchar_fd
> [!info]
> Outputs the character ’c’ to the given file descriptor.
```c
#include <unistd.h>

void ft_putchar_fd(char c, int fd)
{
	write(fd, &c, 1);
}
```

## ft_putstr_fd
> [!info]
> Outputs the string ’s’ to the given file descriptor followed by a new line.
```c
#include <unistd.h>

void ft_putstr_fd(char *s, int fd)
{
	while(*s)
		write(fd, s++, 1);
}

```

## ft_putendl_fd
> [!info]
> Outputs the string ’s’ to the given file descriptor followed by a newline.
```c
#include <unistd.h>

void ft_putendl_fd(char *s, int fd)
{
	while(*s)
		write(fd, s++, 1);
	write(fd, "\n", 1);
}

```

## ft_putnbr_fd
> [!info]
> Outputs the integer ’n’ to the given file descriptor.
```c
#include <unistd.h>
#include <limits.h>

void ft_putnbr_fd(int n, int fd)
{
    if (n == INT_MIN)
    {
        write(fd, "-2147483648", 11);
        return;
    }
    if (n < 0)
    {
        write(fd, "-", 1);
        n = -n;
    }
    if (n > 9)
        ft_putnbr_fd(n / 10, fd);
    char c = (n % 10) + '0';
    write(fd, &c, 1);
}
```