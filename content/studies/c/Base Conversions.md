---
date: 2025-01-08
tags:
  - c
  - ft_printf
  - libft
---

For this example we will create a `ft_itoa_base` function. If you are not familiar with [[studies/42Warsaw/libft/ft_itoa|ft_itoa]] function, you should check it first.

# What is a base?
In mathematics, a base is the number of different digits or combination of digits and letters that a system of counting uses to represent numbers. For example, the decimal system uses ten digits (`0-9`), the binary system uses two digits (`0-1`), and the hexadecimal system uses sixteen digits (`0-9` and `A-F`).

- Decimal: `0123456789`
- Binary: `01`
- Hexadecimal: `0123456789ABCDEF`

# How to convert a number to a different base?
To convert a number to a different base, you need to divide the number by the base and keep track of the remainders. The remainders will be the digits of the new number in the desired base. You can repeat this process until the quotient is zero.

For example, to convert the decimal number `42` to binary, you can divide `42` by `2` and keep track of the remainders:

```c
42 / 2 = 21 // remainder 0
21 / 2 = 10 // remainder 1
10 / 2 = 5  // remainder 0
5 / 2 = 2   // remainder 1
2 / 2 = 1   // remainder 0
1 / 2 = 0   // remainder 1
```

The remainders in reverse order are `101010`, which is the binary representation of `42`.

How does this look in a C?

```c
// simple example of converting a number to binary
#include <stdio.h>

void to_binary(int n) {
    if (n > 1) {
        to_binary(n / 2);
    }
    printf("%d", n % 2);
}

int main(void) {
    int decimal = 42;
    printf("Binary: ");
    to_binary(decimal);
    printf("\n");
    return 0;
}
```

After running the above code, you should see `Binary: 101010` printed to the console. `to_binary` is a recursive function that divides the number by `2` and prints the remainder while the number is greater than `1`.

**to be continued...**