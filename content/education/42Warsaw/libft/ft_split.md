---
tags:
  - C
  - libft
date: 2024-12-18
---

>[!info]
> **ft_split** is a function that splits a string into an array of substrings based on a specified delimiter character. It allocates memory dynamically for each substring and the array, ensuring the result is null-terminated.

![[attachments/excalidraw/ft_split.png]]
## Walkthrough
### Counting words
First, we have to create our `ft_split` function with few variables:
- `char **result` for two-dimensional array
- `int i` to iterate through the `result` array
```c
char	**ft_split(char const *s, char c)
{
	char	**result;
	int		i;
	
	i = 0;
	// ...
}
```
Now, if it was a **one-dimensional** array, we would just count the characters of `s` and allocate that much of memory. But in our case we will have to count each word in `s` splitted by `c`. Therefore, lets create a `count_words` function:

>[!info]
> The `static` keyword in front of a function in C limits its scope to the file where it is declared.

```c
static int	count_words(const char *str, char delim)
{
	int	count;
	// ...
}
```

The word-counting logic should follow these steps:
1. Skip each delimeter `c` 
2. When a character is not equal to the delimiter `c`:
  - Increment the word count.
  - Move the pointer until the next delimiter to locate the next word.
Therefore, the `count_words` function should be implemented as follows:

```c
static int	count_words(const char *str, char delim)
{
	int	count;

	count = 0;
	// for each valid character
	while (*str)
	{
		// skip all delimeters
		while (*str && is_delim(*str, delim))
			str++;
		// if not a delimeter
		if (*str)
		{
			// increment the count
			count++;
			// skip all characters until the next delimeter
			while (*str && !is_delim(*str, delim))
				str++;
			// repeat 🔁
		}
	}
	return (count);
}
```

Now, we can use the `count_words` function to allocate memory for the 2D array.
### Creating the 2D Array
Let's use the `count_words` function to allocate memory for each word, including space for the `NULL` terminator:

```c
char	**ft_split(char const *s, char c)
{
	char	**result;
	int		i;

	i = 0;
	// terminate early if pointer "s" isn't valid
	if (!s)
		return (NULL);
	// Array of Pointers, 2D Array
	result = (char **)malloc((count_words(s, c) + 1) * sizeof(char *));
	if (!result)
		return (NULL);
	// ...
```
### Word Allocation
Now that we have our array of pointers allocated, we need to handle the allocation of individual words. Let's create an `alloc_word` function to manage this:

```c
static char	*alloc_word(const char *str, char delim)
{
	int		len;
	char	*word;
	int		i;

	len = 0;
	i = 0;
	// Count characters until delimiter
	while (str[len] && !is_delim(str[len], delim))
		len++;
	// Allocate memory for the word + null terminator
	word = (char *)malloc((len + 1) * sizeof(char));
	if (!word)
		return (NULL);
	// Copy characters
	while (i < len)
	{
		word[i] = str[i];
		i++;
	}
	// Add null terminator
	word[len] = '\0';
	return (word);
}
```
### Helper Functions
#### free_all
Frees All Allocated Memory in Case of an Error
```c
static void	free_all(char **result, int i)
{
	// free each substring starting from current index
	while (i >= 0)
		free(result[i--]);
	// free the 2D array itself
	free(result);
}
```
#### is_delim
Compares the given char with the delimeter
```c
static int is_delim(char c, char delim)
{
	return (c == delim);
}
```

### Putting Everything Together

```c
char	**ft_split(char const *s, char c)
{
	char	**result;
	int		i;

	i = 0;
	if (!s)
		return (NULL);
	result = (char **)malloc((count_words(s, c) + 1) * sizeof(char *));
	if (!result)
		return (NULL);
		
	while (*s)
	{
		// skip all delimeters
		while (*s && is_delim(*s, c))
			s++;
		if (*s)
		{
			// allocate and fill the memory for current word
			// using pointer "s"
			result[i] = alloc_word(s, c);
			if (!result[i])
				// free all memory in case of an error
				return (free_all(result, i - 1), NULL);
			// increase the index in order to write the next string
			i++;
			// skip all characters until the next delimeter
			while (*s && !is_delim(*s, c))
				s++;
			// repeat 🔁
		}
	}
	result[i] = NULL;
	return (result);
}
```

## Final Code
```c
#include <stdlib.h>

static int	is_delim(char c, char delim)
{
	return (c == delim);
}

static int	count_words(const char *str, char delim)
{
	int	count;

	count = 0;
	while (*str)
	{
		while (*str && is_delim(*str, delim))
			str++;
		if (*str)
		{
			count++;
			while (*str && !is_delim(*str, delim))
				str++;
		}
	}
	return (count);
}

static char	*alloc_word(const char *str, char delim)
{
	int		len;
	char	*word;
	int		i;

	len = 0;
	i = 0;
	while (str[len] && !is_delim(str[len], delim))
		len++;
	word = (char *)malloc((len + 1) * sizeof(char));
	if (!word)
		return (NULL);
	while (i < len)
	{
		word[i] = str[i];
		i++;
	}
	word[len] = '\0';
	return (word);
}

static void	free_all(char **result, int i)
{
	while (i >= 0)
		free(result[i--]);
	free(result);
}

char	**ft_split(char const *s, char c)
{
	char	**result;
	int		i;

	i = 0;
	if (!s)
		return (NULL);
	result = (char **)malloc((count_words(s, c) + 1) * sizeof(char *));
	if (!result)
		return (NULL);
	while (*s)
	{
		while (*s && is_delim(*s, c))
			s++;
		if (*s)
		{
			result[i] = alloc_word(s, c);
			if (!result[i])
				return (free_all(result, i - 1), NULL);
			i++;
			while (*s && !is_delim(*s, c))
				s++;
		}
	}
	result[i] = NULL;
	return (result);
}
```