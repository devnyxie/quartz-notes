---
tags:
  - c
date: 2025-01-09
---

# What is printf?

`printf` is a function in the C standard library that allows you to print formatted output to the console. It is a variadic function, which means it can take a variable number of arguments. The first argument is a format string that specifies how to format the output, and the remaining arguments are the values to be printed.

Make sure to read the [intro](https://42-cursus.gitbook.io/guide/rank-01/ft_printf) and understand how [Variadic Functions](variadic_functions) work. This will help you understand how to implement your own version of `printf`.

# Implementation


```c {18}
// ft_printf.c
#include "ft_printf.h"

int	ft_printf(const char *str, ...)
{
	va_list	args;
	int		len;

	va_start(args, str);
	len = 0;
	while (*str)
	{
		if (*str == '%')
		{
			str++;
			if (*str == '\0')
				break ;
			ft_handle_specifiers(*str, &len, args); // handle c, s, p, d, i, u, x, X, %
		}
		else
			len += write(1, str, 1);
		str++;
	}
	va_end(args);
	return (len);
}
```

```c
// ft_printf.h

#ifndef FT_PRINTF_H
#define FT_PRINTF_H

#include <stdarg.h>
#include <stdlib.h>
#include <unistd.h>

int ft_printf(const char *str, ...);
void ft_handle_specifiers(char current_char, int *len, va_list args);
int ft_putstr(char *s);
int ft_putnbr(int n);
int ft_putnbr_base(unsigned long value, int specifier);
char *ft_strchr(const char *str, int c);

#endif
```


```c
// handlers.c

#include "ft_printf.h"

static void	ft_handle_char(int *len, va_list args);
static void	ft_handle_string(int *len, va_list args);
static void	ft_handle_pointer(int *len, va_list args);
static void	ft_handle_number(char specifier, int *len, va_list args);

void	ft_handle_specifiers(char current_char, int *len, va_list args)
{
	if (current_char == 'c')
		ft_handle_char(len, args);
	else if (current_char == 's')
		ft_handle_string(len, args);
	else if (current_char == 'p')
		ft_handle_pointer(len, args);
	else if (ft_strchr("uxXdi", current_char))
		ft_handle_number(current_char, len, args);
	else if (current_char == '%')
		*len += write(1, "%", 1);
}

static void	ft_handle_char(int *len, va_list args)
{
    char c;
	c = va_arg(args, int);
	*len += write(1, &c, 1);
}

static void	ft_handle_string(int *len, va_list args)
{
    char *temp_s;
	temp_s = va_arg(args, char *);
	if (temp_s == NULL)
		*len += write(1, "(null)", 6);
	else
		*len += ft_putstr(temp_s);
}

static void	ft_handle_pointer(int *len, va_list args)
{
	unsigned long ptr;

	ptr = va_arg(args, unsigned long);
	if (!ptr)
		*len += ft_putstr("(nil)");
	else
		*len += ft_putstr("0x") + ft_putnbr_base(ptr, 'p');
}

static void	ft_handle_number(char specifier, int *len, va_list args)
{
	if (specifier == 'd' || specifier == 'i')
		*len += ft_putnbr(va_arg(args, int));
	else if (ft_strchr("uxX", specifier))
		*len += ft_putnbr_base(va_arg(args, unsigned int), specifier);
}
```

```c
// helpers.c

#include "ft_printf.h"

int	ft_putstr(char *s)
{
	int	i;

	i = 0;
	while (s[i])
		write(1, &s[i++], 1);
	return (i);
}

int	ft_putnbr_base(unsigned long value, int specifier)
{
	char	*base;
	int		base_len;
	int		len;

	if (specifier == 'u')
		base = "0123456789";
	else if (specifier == 'x' || specifier == 'p')
		base = "0123456789abcdef";
	else if (specifier == 'X')
		base = "0123456789ABCDEF";
	base_len = 0;
	len = 0;
	while (base[base_len])
		base_len++;
	if (value >= (unsigned long)base_len)
		len += ft_putnbr_base(value / base_len, specifier);
	write(1, &base[value % base_len], 1);
	return (len + 1);
}

int	ft_putnbr(int n)
{
	char	num;
	int		len;

	len = 0;
	if (n == -2147483648)
	{
		len += write(1, "-2147483648", 11);
	}
	else if (n < 0)
	{
		len += write(1, "-", 1);
		len += ft_putnbr(n * (-1));
	}
	else if (n > 9)
	{
		len += ft_putnbr(n / 10);
		len += ft_putnbr(n % 10);
	}
	else
	{
		num = n + '0';
		len += write(1, &num, 1);
	}
	return (len);
}

char	*ft_strchr(const char *str, int c)
{
	while (*str != '\0')
	{
		if (*str == (char)c)
		{
			return ((char *)str);
		}
		str++;
	}
	if (c == '\0')
	{
		return ((char *)str);
	}
	return (NULL);
}
```
