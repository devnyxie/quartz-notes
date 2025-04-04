---

title: "Shell Pipes in C"
date: 2025-03-20
tags:
    - c
    - unix
description: "A concise introduction to shell pipes in C, covering redirection symbols and essential system calls."
---

# Understanding Shell Pipe Symbols

Shell pipes and redirection operators are essential for controlling input and output in the terminal. Understanding their behavior is crucial for implementing pipes in C.

## Pipe Operator: `|`

The `|` symbol directs the output of one command to the input of another. Example:

```shell
ls | wc -l
```

This counts the number of files in the directory by passing `ls` output to `wc -l`.

## Input Redirection: `<` and `<<`

- `< file` redirects the content of `file` as input to a command:

  ```shell
  cat < file1
  ```

- `<< EOF` initiates a **here-document**, allowing input until `EOF` is encountered:

  ```shell
  cat << EOF
  Hello, World!
  EOF
  ```

## Output Redirection: `>` and `>>`

- `>` redirects output to a file (overwrites existing content):

  ```shell
  ls > file.txt
  ```

- `>>` appends output to a file:

  ```shell
  echo "New line" >> file.txt
  ```

# Key **System** Calls for Pipes

## `pipe()`

Creates a unidirectional communication channel between processes.

```c
int pipe(int pipefd[2]);
```

- `pipefd[0]` (read end)
- `pipefd[1]` (write end)

Example:

```c
int pipefd[2];
pipe(pipefd);
```

## `dup2()`

Duplicates a file descriptor, commonly used to redirect input/output.

```c
int dup2(int oldfd, int newfd);
```

Example (redirect output to a file):

```c
int fd = open("file.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
dup2(fd, STDOUT_FILENO);
printf("This goes to file.txt\n");
```

## `fork()`

Creates a child process. In order to communicate between the parent and child, you typically use `fork()` in conjunction with `pipe()` - the parent process creates a pipe, then forks a child process. The child can read from the pipe while the parent writes to it.

> [!attention]
> A very important thing to understand is that once you write `pid_t pid = fork();`, the process is **duplicated**. In other words, your code is now in two dimensions: the parent and the child. The child process is an exact copy of the parent process, except for the return value of `fork()`. In the parent process, `fork()` returns the child's PID (a positive integer), while in the child process, it returns `0`. This allows you to differentiate between the two processes.

```c
pid_t fork();
```

## `waitpid()`

Ensures the parent waits for certain child processes to finish, preventing zombie processes.

```c
pid_t waitpid(pid_t pid, int *status, int options);
```

This prevents zombie processes.


## `wait()`
Waits for any child process to finish.

```c
pid_t wait(int *status);
```


## Example: Parent Writing, Child Reading

```c
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    int pipefd[2];
    char buffer[100];
    pipe(pipefd);
    pid_t pid = fork();

    if (pid == 0) {  // Child process
        close(pipefd[1]);
        read(pipefd[0], buffer, sizeof(buffer));
        printf("Child received: %s\n", buffer);
        close(pipefd[0]);
    } else {  // Parent process
        close(pipefd[0]);
        write(pipefd[1], "Hello from parent", 17);
        close(pipefd[1]);
        wait(NULL);
    }
    return 0;
}
```

This demonstrates basic interprocess communication using pipes.

---

Understanding these symbols and functions lays the foundation for working with shell pipes in C. Mastering them will enable more complex interprocess communication and command-line utilities.

