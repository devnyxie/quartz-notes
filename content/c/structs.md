---
title: Structs in C
tags:
  - c
date: 2025-01-18
---

Structs are a way to group variables together. They are similar to classes in other languages. In order to access the values of a struct, you can use the `.` operator. If you have a pointer to a struct, you can use the `->` **Arrow Operator** (AO) to access the values.

```c

# Examples
## Point Coordinates
```c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p;
    p.x = 10;
    p.y = 20;

    printf("x: %d, y: %d\n", p.x, p.y);
    return 0;
}
```

## Linked Lists
Structs can also be used to create [[studies/c/linked_lists|Linked Lists]] :D

```c
#include <stdio.h>

struct Node {
    int data;
    struct Node* next;
};

int main() {
    struct Node n1, n2, n3;
    n1.data = 10;
    n2.data = 20;
    n3.data = 30;

    n1.next = &n2;
    n2.next = &n3;
    n3.next = NULL;

    struct Node* current = &n1;
    while (current != NULL) {
        printf("%d\n", current->data);
        current = current->next;
    }

    return 0;
}
```
## Buffer

In the following example, we define a `Buffer` struct that contains a pointer to a character array, and two integers to represent the start and end indices of the buffer. We also define a function `print_buffer` that prints the contents of the buffer between the start and end indices.

```c
#include <stdio.h>

struct Buffer {
    char *data;
    int start;
    int end;
};

void print_buffer(struct Buffer *b) {
    for (int i = b->start; i < b->end; i++) {
        printf("%c", b->data[i]);
    }
    printf("\n");
}

int main() {
    char data[] = "Hello, World!";
    struct Buffer b;
    b.data = data;
    b.start = 0;
    b.end = 5;

    print_buffer(&b);

    return 0;
}
```

As you can see above, an Arrow Operator `->` is used to access struct members when using a pointer to a struct, while `.` is used when using the struct directly.

