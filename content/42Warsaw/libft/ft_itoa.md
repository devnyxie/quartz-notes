---
date: 2024-12-21
tags:
  - libft
---
>[!info] 
> `itoa` converts an integer into its string representation. It handles both positive and negative numbers, allocates memory for the resulting string (including the null terminator), and returns the string.
# Walkthrough
Here the logic is pretty straightforward. Our steps should be:
1. get the len of the integer `N` 
    - +1 if `N=0`, still the len of `0` is `1`
    - +1 if `N<0`, space for the minus sign.
2. allocate memory for string "result" -> `(len+1)*sizeof(char)`
   - memory should be initialized, since we should loop until the negative sign `-` when filling the `result`; garbage values may interfere. Therefore I'll use [ft_calloc()](/42Warsaw/libft/ft_calloc).
4. (loop) assign last digit of `(N%10)+'0'` to `result[len--]`
## Number Length
```c
static int	numlen(int n)
{
	int	length;

	length = 0;
	if (n <= 0)
	{
		// if N is 0 -> make it 1
		// if N is negative -> we need +1 byte for the sign
		length++;
		n = -n;
	}
	while (n != 0)
	{
		// count and substract each digit of N
		n /= 10;
		length++;
	}
	return (length);
}
```
## Memory Allocation
```c
char	*ft_itoa(int n)
{
	int		len;
	char	*result;
	long	num;
	
	num = n;
	len = numlen(n);
	result = (char *)ft_calloc(sizeof(char), (len + 1));
	if (!result)
		return (NULL);
	// With num len known, add null terminator directly
	result[len] = '\0';
```

> [!question] Why we are using `long` for num, even though we accept `int` as a function parameter?
> Let me explain:
> - The range of `int` is from `-2147483648` to `2147483647`.
> - When `n` is `-2147483648` (which is `INT_MIN`), converting it to positive would exceed the range of `int` because `2147483648` is out of the `int`range.
> - By using `long`, which has a larger range, we can safely handle this conversion.
# Filling the Result
```c
// ...

char	*ft_itoa(int n)
{
	int		len;
	char	*result;
	long	num;
	
	num = n;
	len = numlen(n);
	result = (char *)ft_calloc(sizeof(char), (len + 1));
	if (!result)
		return (NULL);
	// With num len known, add null terminator directly
	result[len] = '\0';
	if (num < 0)
	{
	    result[0] = '-'; // Add '-' at the start for negative numbers
	    num = -num;      // Convert num to positive
	}
	while (--len >= 0 && result[len] != '-')
	{
	    result[len] = (num % 10) + '0'; // Add digits from the end
	    num /= 10;
	}
	return result;
}
```

# Diagram
![[../../attachments/excalidraw/ft_itoa.svg|500]]