---
date: 2024-12-22
tags:
  - c
---
> [!info]
> **ft_memmove** is a function from the [[studies/42Warsaw/libft/index|Libft]] project in the [[studies/42Warsaw/index|42 curriculum]].
> The function copies a block of memory from one location to another, <u>ensuring safe handling of overlapping source and destination areas</u> by using a temporary buffer. It guarantees the correct order of copying, unlike `memcpy`, which may corrupt data if the regions overlap.

# Walkthrough
Moving memory from point A to point B is pretty straightforward if you've reached this exercise. We cast `void` parameters to `unsigned char` and move `char` by `char` until `(n--)`. However, the key focus of this exercise lies in **safely handling overlapping source and destination areas**, which we’re going to cover here.

> [!attention] 
> You can still close this tab. Consider yourself warned xx

```c
void	*ft_memmove(void *dest, const void *src, size_t n)
{
	unsigned char		*d;
	const unsigned char	*s = src;

	d = dest;
	if (d == s)
	{
		return (dest);
	}
	if (d < s)
	{
		while (n--)
		{
			*d++ = *s++;
		}
	}
	else
	{
		d += n;
		s += n;
		while (n--)
		{
			*(--d) = *(--s);
		}
	}
	return (dest);
}
```

![[attachments/excalidraw/ft_memmove_1.svg]]
## Explanation
Why would we copy backward if destination is after source? Let's consider the following scenario:
![[attachments/excalidraw/ft_memmove_2.svg|500]]

So,
- If `dst > src`, copy **backward** to avoid overwriting `src`
- If `dst < src`, copy **forward** as no overlap risk exists
![[attachments/excalidraw/ft_memmove_3.svg]]