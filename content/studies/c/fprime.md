---
title: "fprime()"
tags:
  - c
  - algorithm
date: 2025-02-03
---

# Introduction

**fprime()** is a simple algorithm that finds and prints all the prime factors of a given number. A prime factor is a number that is a prime number and divides the given number without leaving a remainder.

In order to find the prime factors of a number, we need to divide the number by the smallest prime number (2) and continue dividing the result by the smallest prime number until the result is 1.

> [!info]
> In this exercise we are allowed to use external functions: `atoi()` and `printf()`. This simplifies the task a lot.

For example:

```bash
$ ./a.out 42 | cat -e
2*3*7$
```

# Code

```c
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char **argv) {
    if (argc == 2) {
        int divider = 2;
        int num = atoi(argv[1]);

        while (num > 1) {
            while (num % divider == 0) {
				printf("%d", divider);
                num = num / divider;
                if (num > 1)
                    printf("*");
            }
            divider++;
        }
    }
    printf("\n");
    return 0;
}

