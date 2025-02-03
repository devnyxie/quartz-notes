---
title: "max()"
tags:
  - c
  - algorithm
date: 2025-01-18
---

# Introduction

The `max()` function is a simple function that returns the maximum value in an array of integers in C.

# Code

```c
int	max (int* tab, unsigned int len) {
	int great = 0;
	while(len > 0){
		if(great < tab[len-1]){
			great = tab[len-1];
		}
		len--;
	}
	return(great);
}

// Testing the function
int main(void){
	int arr[4] = {1, 2, 10, 3};
	int res = max(arr, 4);
	printf("%d\n", res);
	return(0);
}
```