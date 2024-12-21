---
date: 2024-12-21
tags:
  - libft
---
> [!info]
> `memmove` copies a block of memory from one location to another, <u>ensuring safe handling of overlapping source and destination areas</u> by using a temporary buffer. It guarantees the correct order of copying, unlike `memcpy`, which may corrupt data if the regions overlap.

# Walkthrough
Moving memory from point A to point B is pretty straightforward if you've reached this exercise. We cast `void` parameters to `unsigned char` and move `char` by `char` until `(n--)`. However, the key focus of this exercise lies in **safely handling overlapping source and destination areas**, which we’re going to cover here.

> [!attention] 
> You can still close this tab. Consider yourself warned xx

![[../../attachments/excalidraw/ft_memmove.svg]]
## Explanation
Why would we copy backward if destination is after source? Let's consider the following scenario:
![[attachments/excalidraw/ft_memmove_overflow.svg]]