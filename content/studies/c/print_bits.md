---
tags:
  - c
date: 2025-02-09
title: print_bits.c
---
```
Assignment name  : print_bits
Expected files   : print_bits.c
Allowed functions: write
--------------------------------------------------------------------------------

Write a function that takes a byte, and prints it in binary WITHOUT A NEWLINE
AT THE END.

Your function must be declared as follows:

void	print_bits(unsigned char octet);

Example, if you pass 2 to print_bits, it will print "00000010"
```

Whole point of this exercise is to extract the digits of the binary representation of a number. It's no array, so we can't access the digits directly by index or a pointer. So what can we do instead?

![[attachments/excalidraw/ft_atoi_base 1.png|250]]

We can repeat this process for each digit by shifting the bits to the right and masking the least significant bit (discarding the rest). We can do this in a loop until all bits are printed. Point is, for each digit the amount of bits we need to shift is NOT the same. We need to shift the bits to the right by `i` positions, where `i` is the index is the maximum index of the digit for the needed digit. For example;
- First digit at index 0: shift by 7
- Second digit at index 1: shift by 6
- And so on...

```c
void print_binary(unsigned char byte) {
    int i = 7;
    while (i >= 0) {
        // byte >> i: extract the bit at index i
        // & 1: discard the rest of the bits
        int bit = (byte >> i) & 1;
        char bit_char = bit + '0';
        write(1, &bit_char, 1);
        i--;
    }
}

int main() {
    unsigned char byte = 42;
    print_binary(byte);
    printf("\n");
    return 0;
}
```
