---
tags:
  - c
date: 2025-01-11
---
![[attachments/Untitled-2025-01-08-0424 (1).webp|700]]

# What is a Makefile?

A Makefile is a file that contains a set of rules used to build and manage a project. It is used to automate the process of compiling and linking source code files into an executable program.

# Why use a Makefile?

Let's say we have to compile a [[studies/c/libft/index|libft]] library that consists of multiple source files. Instead of manually compiling each source file and linking them together, we can use a Makefile to automate the process.


# Practical Example (executable)

Let's say we have a project with the following files:
- `main.c`
- `utils.c`
- `utils.h`

Main file (`main.c`) contains the `main` function which calls a function from `utils.c` using a function prototype from `utils.h` (header file).

Let's create a Makefile to compile these files into an executable program:

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -Werror
OUT = program

SRC = main.c \
	  utils.c \
OBJ = $(SRC:.c=.o)

all: $(OUT)

$(OUT): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
    rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re
```

> [!info] Automatic Variables
> - `$@` represents the target of the rule.
> - `$^` represents all the prerequisites of the rule.
> - `$<` represents the first prerequisite of the rule.

Running make will:
- Compile `main.c` into `main.o` and `utils.c` into `utils.o` using the rule for .o files.
- Link `main.o` and `utils.o` into the program executable (program).

The flow in detail:
1. The `all` target depends on `$(OUT)` (which is program), so **Make** looks for the rule to build `$(OUT)`.
    The rule for `$(OUT)` is:
    ```makefile
    $(OUT): $(OBJ)
        $(CC) $(CFLAGS) -o $@ $^
    ```
2. The rule for `$(OUT)` depends on `$(OBJ)` (which is `main.o` and `utils.o`), so **Make** looks for the rules to build `$(OBJ)`.
3. The rule to build `.c` files into `.o` files is:
    ```makefile
    %.o: %.c
        $(CC) $(CFLAGS) -c $< -o $@
    # gcc -Wall -Wextra -Werror -c main.c -o main.o
    # gcc -Wall -Wextra -Werror -c utils.c -o utils.o
    ```
	 ![[attachments/Frame 1(2).webp]]
    **Make** uses this rule to build `main.o` and `utils.o`.
1. Now that `main.o` and `utils.o` are built, **Make** can continue building `$(OUT)` (program) by linking `main.o` and `utils.o` to create the executable program:
    ```makefile
    $(OUT): $(OBJ)
        $(CC) $(CFLAGS) -o $@ $^
    # Translates to: gcc -Wall -Wextra -Werror -o program main.o utils.o
    ```
5. The program is built successfully.

# Makefile Syntax (library)

A Makefile consists of rules that define how to build the project. A common example of a Makefile is:

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -Werror
OUT = libft.a

SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)

all: $(OUT)

$(OUT): $(OBJ)
	ar rcs $@ $^
# "ar rcs $@ $^" is equivalent to "ar rcs libft.a *.o" in this case

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(OUT)

re: fclean all

.PHONY: all clean fclean re
```

In this Makefile:
1. `CC` is the compiler to use
2. `CFLAGS` are the compiler flags
7. `clean` removes object files
8. `fclean` removes object files and the library (libft.a)
9. `re` rebuilds everything by cleaning and building the library
10. `.PHONY` specifies that `all`, `clean`, `fclean`, and `re` are commands, not files.
