---
date: 2024-12-22
tags:
  - c
---

> [!info]
> The function outputs the integer ’n’ to the given [[studies/c/file_descriptors|File Descriptor]].

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

We have to handle `INT_MIN` separately because the absolute value of `INT_MIN` is out of the range of `int`. Therefore, we cannot convert it to a positive number without causing an [[studies/c/int_overflow|Integer Overflow]].
