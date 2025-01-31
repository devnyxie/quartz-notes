---
title: Preprocessor Macros
tags:
    - c
date: 2025-01-22
---
In C, a preprocessor macro is a directive that defines a symbolic name or a constant value. Macros are used to make the code more readable and maintainable by replacing repetitive code with a single line of code. The preprocessor replaces the macro with its definition **before** the code is compiled.

# How to Define a Macro?

To define a macro, you use the `#define` directive followed by the macro name and its value. Here's an example of defining a macro that represents the value of `PI`:

```c
#include <stdio.h>

#define PI 3.14159

int main() {
    double radius = 5.0;
    double area = PI * radius * radius;
    printf("Area of the circle is: %f\n", area);
    return 0;
}
```
Whenever the preprocessor encounters `PI` in the code, it will replace it with `3.14159` **before** the code is compiled.


