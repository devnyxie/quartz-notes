---
title: "search_and_replace()"
tags:
  - c
  - algorithm
date: 2025-02-03
---

# Introduction

**Search and Replace** is a simple algorithm that replaces all occurrences of a given character in a string with another character.

For example:

```bash
$ ./a.out "Hello, World!" "o" "a" | cat -e
$ Hella, Warld!$
```

# Code

Keep in mind that 1st argv argument is program's name, so we should skip it and start from 2nd argument - that's why we check if `argc == 4`.

```c
int main(int argc, char **argv)
{
	if(argc == 4 && !argv[2][1] && !argv[3][1]){
		char *str = argv[1];
		while(*str){
			if(*str == argv[2][0]){
				write(1, &argv[3][0], 1);
			} else {
				write(1, str, 1);
			}
			str++;
		}
	}
	write(1, "\n", 1);
}
```

