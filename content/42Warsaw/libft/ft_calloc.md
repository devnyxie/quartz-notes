---
tags:
  - C
  - libft
date: 2024-12-18
---

>[!info] 
> - **malloc**: Allocates memory, but leaves it uninitialized (contains garbage values). You must manually initialize the memory before use to avoid errors. <br/>
>   `| 1327 | 2481 | 5972 | 8430 | 9234 | <-- Leftover values (random binary)` <br/>
>   Reading from uninitialized memory is **undefined behavior** in C, which means your program could crash, produce incorrect results, or behave unpredictably.
> -  **calloc**: Allocates memory and initializes it to zero. Ideal when you want memory pre-initialized and ready for later use without extra work. <br/>
>   `| 0000 | 0000 | 0000 | 0000 | 0000 | <-- Safely zeroed`

![[../../attachments/excalidraw/ft_calloc.png]]
# Code
```c
#include <stdio.h>
#include <stdlib.h>

void *ft_calloc(size_t nmemb, size_t size)
{
        void *arr = (unsigned int *)malloc(nmemb * size);
        if(arr == NULL) {
                return NULL;
        }
        size_t i = 0;
        // Cast to unsigned char to initialize memory byte by byte,
        // regardless of type.
        unsigned char *ptr = (unsigned char *)arr;
        while (i < (nmemb * size)) {
                ptr[i] = 0;
                i++;
        }
        return (void *)arr;
}
```
