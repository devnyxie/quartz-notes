---
title: Integer Overflow
tags:
  - c
date: 2025-01-17
---

Integer Overflow occurs when an arithmetic operation results in a value that exceeds the range of representable values in the given data type. In C, this behavior is **undefined**.

For example, consider the following code snippet:

```c
#include <stdio.h>

int main(void) {
    int x = 2147483647;  // INT_MAX
    x = x + 1;           // Overflow
    printf("%d\n", x);   // -2147483648 (INT_MIN)

    int j = 2147483647;  // INT_MAX
    j = j + 5;           // Overflow
    printf("%d\n", j);   // -2147483644
    return(0);
}
```

Here we can see that adding to a `INT_MAX` results in a wraparound to `INT_MIN`. Thats why the output is `-2147483648` instead of `2147483648`. In general, that's what integer overflow in C is.

# Detailed Review

Let's understand this behavior in more detail.


```c
int a = 2147483647;
int b = 2147483646;
int c = a + b;
printf("%d\n", c);
```

In the above code snippet, make your guess about the value of `c` before running the code. After running the code, you will see that the output is `-3`. This is because the sum of `2147483647` and `2147483646` is `4294967293`, which is out of the range of `int` - but wait, why is the output `-3`? It's a bit more complicated than you might think.

When adding `2147483647` and `2147483646`, the binary addition would go as follows:

```plaintext
2147483647 = 01111111 11111111 11111111 11111111
2147483646 = 01111111 11111111 11111111 11111110
```

Adding them gives:
```plaintext
01111111 11111111 11111111 11111111 +
01111111 11111111 11111111 11111110 =
11111111 11111111 11111111 11111101
```

So our result is `11111111 11111111 11111111 11111101`.

> [!warning]
> If you try to use any Binary Calculator to validate this addition, they won't probably show the correct result because they are using 32-bit integers, therefore this operation will result in an error

The result is `4294967293` in unsigned binary. However, since the result is stored in a 32-bit int (signed), it wraps around modulo `2^32`, because the range of int is limited to [−2^31,2^31−1].

Because the [[studies/c/msb|MSB]] of the result is 1, the binary value `11111111 11111111 11111111 11111101` is negative. [[studies/c/twos_complement_form|Two's Complement]] is used to determine its value.

1. Invert all bits: `11111111 11111111 11111111 11111101` -> `00000000 00000000 00000000 00000010`
2. Add `1`: `00000000 00000000 00000000 00000010` -> `00000000 00000000 00000000 00000011`

All what's left is to convert `00000000 00000000 00000000 00000011` to decimal, which is `-3`.

This is why `2147483647` + `2147483646` = `-3` in C.

Congrats! <br/>
![[attachments/gifs/frieren_pat.gif|450]]