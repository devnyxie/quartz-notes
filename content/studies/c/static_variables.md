---
title: Static Variables
tags:
    - c
date: 2025-01-18
---

Static variables in C are variables that retain their value between function calls. They are declared using the `static` keyword. Here are some essential points about static variables:

- **Lifetime**: Static variables are created when the program starts and destroyed when the program ends. They retain their value between function calls.
- **Memory Location**: Static variables are allocated in the data segment of memory, not the stack segment like regular local variables.
- **Scope**: Static variables have a local scope. They are only accessible within the function where they are declared.
- **Initialization**: Static variables are initialized only once. If not explicitly initialized, they are initialized to zero.
- **Type**: Static variables can be of any type, including arrays and structures.


Here's an example of using static variables in C:

```c
#include <stdio.h>

// function with static variable
int fun()
{
    static int count = 0;
    count++;
    return count;
}

int main()
{
    printf("%d ", fun());
    printf("%d ", fun());
    return 0;
}
```
