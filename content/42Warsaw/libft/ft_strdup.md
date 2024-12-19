
>[!info] Manual
> **strdup** duplicates a string by allocating memory for a new copy, copying the content of the original string, and appending a null terminator (\0). It returns a pointer to the new string or NULL if memory allocation fails.

# Code
```c
#include <stdlib.h>

char *ft_strdup(const char *src)
{
    if (!src) return NULL; // Check if the input string is valid

    // Calculate string size
    unsigned int size = 0;
    while (src[size]) {
        size++;
    }

    // Allocate memory (+1 for null terminator)
    char *dup = (char *)malloc((size + 1) * sizeof(char));
    if (!dup) return NULL; // Check if allocation was successful

    // Copy string content
    char *temp_ptr = dup;
    while (*src) {
        *temp_ptr = *src;
        temp_ptr++;
        src++;
    }
    *temp_ptr = '\0';

    return dup;
}
```