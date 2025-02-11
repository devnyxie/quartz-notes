---
tags:
  - c
date: 2025-02-09
title: ft_atoi_base.c
---

Do you remember the `ft_atoi` function? It converts a string to an integer in few words.

Now, we will implement a similar function, but this time we will convert a string to an integer in a given base. The base will be passed as a string containing all the digits of the base. The function will return the converted integer.

For example:

- base "0123456789" (10) will convert the string `42` to `42`
- base "01" (2) will convert the string `101010` to `42`
- base "0123456789ABCDEF" (16) will convert the string `2A` to `42`
- base "0123456789ABCDEF" (16) will convert the string `7F` to `127`

We already know how to convert a string to an integer in base 10, and how to [[studies/c/base_conversions|convert base 10 to another base]]. We can combine these two to implement the `ft_atoi_base` function.

One thing to keep in mind is that the base can be any number between 2 and 16. We will implement a helper function to check if a character is a digit in the given base:

```c
static int	ft_isdigit(char c, int base)
{
	if (c >= '0' && c <= '9')
		return (c - '0');
	if (c >= 'a' && c <= 'f')
		return (c - 'a' + 10);
	if (c >= 'A' && c <= 'F')
		return (c - 'A' + 10);
	return (-1);
}
```

> [!info]
> You may wonder why we subtract 10 from the character value when the character is between 'a'/'f' and 'A'/'F'. The reason is that we need to convert the character to a number. The character 'a' should be converted to 10, 'b' to 11, and so on. We can achieve this by subtracting 'a' from the character and adding 10.

```c
int	ft_atoi_base(const char *str, int str_base)
{
	int result = 0;
	int sign = 1;
	int value;

    // check if the base is valid
	if (!str || str_base < 2 || str_base > 16)
		return (0);
    // skip spaces
	while (*str == ' ' || (*str >= 9 && *str <= 13))
		str++;
    // check for the sign
	if (*str == '-')
	{
		sign = -1;
		str++;
	}
    // check if the char exists in the base
	while ((value = ft_isdigit(*str, str_base)) >= 0 && value < str_base)
	{
        // if so, add the value to the result
		result = result * str_base + value;
		str++;
	}
	return (result * sign);
}
```

So, in case of base `10` and `42`, the following will happen:
- `result = 0 * 10 + 4 = 4`
- `result = 4 * 10 + 2 = 42`

But in case of base `16` and `7F`:
- `result = 0 * 16 + 7 = 7`
- `result = 7 * 16 + 15 = 127`