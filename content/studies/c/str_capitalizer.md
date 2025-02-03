---
title: "str_capitalizer"
tags:
  - c
  - algorithm
date: 2025-02-01
---

# Introduction

**str_capitalizer** is a simple algorithm that capitalizes the first letter of each word in a string.

> [!warning]
> This code was written for educational purposes. It is not efficient and is not be the best solution after all.

For example:

```bash
$ ./a.out "hello, world! 123" | cat -e
Hello, World! 123$
```

# Code

```c
char capitalize(char c);
char lowercase(char c);
int isCap(char c);
int isLow(char c);
int is_alpha(char c);

int main(int argc, char **argv){
	int i = 1;
	while(i < argc){
		char *str = argv[i];
		int j = 0;
		while(str[j]){
            // Capitalize the first letter of the string
			if (j == 0){
				if(is_alpha(str[j]) && isLow(str[j])){
					char capitalized = capitalize(str[j]);
					write(1, &capitalized, 1);
				} else {
					write(1, &str[j], 1);
				}
			} else {
                // Capitalize the first letter of each word
				if(is_alpha(str[j]) && isCap(str[j])){
					char lowercased = lowercase(str[j]);
					write(1, &lowercased, 1);
				} else {
					write(1, &str[j], 1);
				}
			}
			j++;	
			
		}
		write(1, "\n", 1);
		i++;
	}
	if(argc == 1){
		write(1, "\n", 1);
	}
	return(0);
}

char capitalize(char c){
	return(c-32);
}

char lowercase(char c){
	return(c+32);
}

int isCap(char c){
	if(c >= 'A' && c <= 'Z'){
		return(1);
	}
	return(0);
}
int isLow(char c){
	if(c >= 'a' && c <= 'z'){
		return(1);
	}
	return(0);
}

int is_alpha(char c){
	if(c >= 'A' && c <= 'z'){
		return(1);
	}
	return(0);
}
```