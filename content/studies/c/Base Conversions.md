---
date: 2025-01-08
tags:
  - c
---

# What is a base?
In mathematics, a base is the number of different digits or combination of digits and letters that a system of counting uses to represent numbers. For example, the decimal system uses ten digits (`0-9`), the binary system uses two digits (`0-1`), and the hexadecimal system uses sixteen digits (`0-9` and `A-F`).

- Decimal: `0123456789`
- Binary: `01`
- Hexadecimal: `0123456789ABCDEF`

# How to convert a number to a base?
To convert a number to a different base, you need to divide the number by the base and keep track of the remainders. The remainders will be the digits of the new number in the desired base. You can repeat this process until the quotient is zero.


## Converting Decimal to Binary
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

How does this look like in a C?

```c
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

## Converting Decimal to Hexadecimal

To convert a decimal number to hexadecimal, you can follow a similar process as above, but this time divide by `16`.

```c
#include <stdio.h>

void to_hex(int n) {
    if (n > 15) {
        to_hex(n / 16);
    }
    int remainder = n % 16;
    if (remainder < 10) {
        printf("%d", remainder);
    } else {
        printf("%c", 'A' + remainder - 10);
    }
}

int main(void) {
    int decimal = 42;
    printf("Hexadecimal: ");
    to_hex(decimal);
    printf("\n");
    return 0;
}
```
