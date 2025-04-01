---
title: "Pipex: Shell Pipes in C"
date: 2025-03-20
tags:
  - c
  - unix
  - project
description: "Learn how to implement shell pipes in C using low-level process management, file descriptors, and inter-process communication."
---

**pipex** is a **UNIX pipeline emulator** that reimplements shell piping using low-level **process management, file descriptors, and inter-process communication** in C. It requires **forking child processes**, managing **input/output redirections**, and efficiently handling **system calls like `execve`, `dup2`, and `pipe`**. The project deepens understanding of **data flow between processes**, **error handling**, and **the intricacies of system-level programming**, all while reinforcing the fundamentals of **UNIX philosophy and shell mechanics**.

# Symbols
First, we have to understand what `</<<` and `>/>>` do in the shell in order to be able to replicate them in our program later on.

## `|` Symbol
The `|` symbol is used to pipe the output of one program to the input of another program. For example, `ls | wc -l` will display the number of files in the current directory.

```shell
ls | wc -l
```

## `<` & `<<` Symbol

Many programs are ready to accept filenames as arguments. For example, the `cat` program can take a filename as an argument and display the content of the file. However, some programs don't support filenames as arguments. Instead, they read from the standard input. The `<` symbol is used to redirect the content of a file to the standard input of a program. For example, `cat < file` will display the content of the file.

Let's go over few more examples:

- This will display the content of file1:
```shell
cat < file1
```

- This will create a temporary file and write the content to it, until EOF is encountered:

```shell
cat << EOF
```

The `<<` symbol is used to redirect the content of the shell to the standard input of a program. For example, the following will display whatever is written to `STDIN` until `EOF` is encountered:


```shell {6,7}
cat << EOF
> test
> test
> EOF

test
test
```


## `>` & `>>` Symbol

These ones on the other hand are used to redirect the output of a program to a file. The `>` symbol is used to redirect the output of a program to a file. For example, `ls > file` will write the output of the `ls` command to the file.

```shell
ls > file
```

The `>>` symbol is used to append the output of a program to a file. For example, `ls >> file` will append the output of the `ls` command to the file.

```shell
ls >> file
```

# Functions

You already are familiar with `write()`, `ft_printf()`, `free()` etc. functions, but in this project, you will have to use some new functions. Here are some of them:

## `access()`

The `access()` function checks whether the calling process can access the file pathname. If pathname is a symbolic link, it is dereferenced.

```c
int access(const char *pathname, int mode);
```

> [!info]
> If you remember the [[c/get_next_line|Get Next Line]] project,  we used `open()` function to open a file without checking if we have sufficient permissions to open that file, and using `access()` would have been a great addition to that project for additional error handling! ⭐

The `mode` specifies the accessibility check(s) to be performed, and is either the value `F_OK`, or a mask consisting of the bitwise OR of one or more of `R_OK`, `W_OK`, and `X_OK`. `F_OK` tests for the existence of the file. `R_OK`, `W_OK`, and `X_OK` test whether the file exists and grants read, write, and execute permissions, respectively.

```c
    if (access("readfile", R_OK) == 0)
        printf("readfile is accessible in reading mode\n");
    if (access("writefile", W_OK) == 0)
        printf("writefile is accessible in writing mode\n");
    if (access("executefile", X_OK) == 0)
        printf("executefile is accessible in execution mode\n");
    if (access("rwfile", R_OK|W_OK) == 0)
        printf("rwfile is accessible in writing and reading mode\n");
```

- Success: `access()` returns 0.
- Failure: `access()` returns -1 and sets [[c/errno]] to indicate the error.

## `dup2()`

The `dup2()` system call creates a copy of the file descriptor oldfd, using the file descriptor number specified in newfd. If the file descriptor newfd was previously open, it is silently closed before being reused.

```c
int dup2(int oldfd, int newfd);
```

Sounds cool, but where can we use it? 🤔

Let's say you want to redirect the output of a program to a file. You can use `dup2()` to redirect the output of the program to a file descriptor, and then use `write()` to write the output to the file.

```c
int fd = open("file", O_WRONLY | O_CREAT | O_TRUNC, 0644);
dup2(fd, 1);
printf("Hello, world!\n");
```

In this example, the output of the `printf()` function will be written to the file descriptor `fd`, which is associated with the file `file`. In other words, the output of the `printf()` function will be written to that file.

- Success: `dup2()` returns the new file descriptor.
- Failure: `dup2()` returns -1 and sets [[c/errno]] to indicate the error.

## `pipe()`

The `pipe()` system call creates a pipe, a unidirectional data channel that can be used for interprocess communication. The array pipefd is used to return two file descriptors referring to the ends of the pipe. pipefd[0] refers to the read end of the pipe, and pipefd[1] refers to the write end of the pipe.

![[Pasted image 20250321154830.png|400]]

```c
int pipe(int pipefd[2]);
```

The `pipe()` system call creates a pipe, which is an object allowing two processes to communicate. The pipe has two ends: a **read** end and a **write** end. Data written to the **write** end of the pipe can be read from the **read** end of the pipe.

Let's see an example:

```c
// pipe system call in C 
#include <stdio.h>    // For printf()
#include <stdlib.h>   // For exit()
#include <unistd.h>   // For pipe(), read(), write()
#define MSGSIZE 16 

char* msg1 = "hello, world #1"; 
char* msg2 = "hello, world #2"; 
char* msg3 = "hello, world #3"; 

int main() { 
    char inbuf[MSGSIZE]; 
    int p[2], i; 

    // Create a pipe and check for errors
    if (pipe(p) < 0) { 
        perror("pipe"); 
        exit(1); 
    } 

    // Write to the pipe
    write(p[1], msg1, MSGSIZE); 
    write(p[1], msg2, MSGSIZE); 
    write(p[1], msg3, MSGSIZE); 

    // Read from the pipe
    for (i = 0; i < 3; i++) { 
        read(p[0], inbuf, MSGSIZE); 
        printf("%s\n", inbuf); 
    } 

    // Close file descriptors
    close(p[0]); 
    close(p[1]); 

    return 0; 
}
```

Pipes behave FIFO(First in First out), Pipe behave like a queue data structure. Size of read and write don’t have to match here. We can write 512 bytes at a time but we can read only 1 byte at a time in a pipe.

- Success: `pipe()` returns 0.
- Failure: `pipe()` returns -1 and sets [[c/errno]] to indicate the error.

## `fork()`

The `fork()` system call creates a new process by duplicating the calling process. The new process, called the child, is an exact copy of the parent, except for a few differences: it has a unique process ID, and its parent process ID matches that of the original process. Each `fork()` call creates an independent process with its own set of file descriptors (FDs), which are copied from the parent. If multiple `fork()` calls are made, each child gets a separate copy of these FDs. 

Average execution flow of `fork()` system call:
1. Parent calls `fork()`, creating a child.  
2. Both parent and child continue execution from the same point but as separate processes.  
3. If multiple `fork()` calls occur, this process repeats, creating more independent processes.  
4. Each child should close unnecessary FDs.  
5. Each process completes its task and calls `_exit()` or `exit()`.  
6. Parent should `waitpid()` to prevent zombies.  

> [!warning]
> To prevent resource leaks, each process should close unnecessary FDs, complete its task, and terminate properly. The parent should call `waitpid()` to clean up terminated child processes and prevent zombies.   

Example of a very simple `fork()` call:

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child process\n");
    } else {
        printf("Parent process\n");
    }
    return 0;
}
```

Outputs:

```
Parent process
Child process
```

An important thing to understand is how child processes multiply when calling fork() multiple times:

```c
int main()
{
    fork();
    fork();
    fork();
    printf("hello\n");
    return 0;
}
```

Take a guess: how many times will `"hello"` be printed?

The answer is 8 times. But why? Let's break it down:

```c
fork ();   // Line 1
fork ();   // Line 2
fork ();   // Line 3
       L1       // There will be 1 child process 
    /     \     // created by line 1.
  L2      L2    // There will be 2 child processes
 /  \    /  \   //  created by line 2
L3  L3  L3  L3  // There will be 4 child processes 
                // created by line 3
```

Let's review a larger, real world example with interprocess communication. Let's say we have a parent process that creates a child process, and the child process writes to a pipe, which the parent process reads from.


```c
#include <sys/wait.h>
#include <stdlib.h>

int main() {
    int pipefd[2];
    pid_t cpid;
    char buf;

    if (pipe(pipefd) == -1) {
        perror("pipe");
        exit(EXIT_FAILURE);
    }

    cpid = fork();
    if (cpid == -1) {
        perror("fork");
        exit(EXIT_FAILURE);
    }

    if (cpid == 0) {
        close(pipefd[1]);

        while (read(pipefd[0], &buf, 1) > 0)
            write(STDOUT_FILENO, &buf, 1);

        write(STDOUT_FILENO, "\n", 1);
        close(pipefd[0]);
        _exit(EXIT_SUCCESS);

    } else {
        close(pipefd[0]);
        write(pipefd[1], "hello world\n", 12);
        close(pipefd[1]);
        wait(NULL);
        exit(EXIT_SUCCESS);
    }
}
```

There is no magic here; on line 14 we split our function into two processes. The child process reads from the pipe and the parent process writes to the pipe. The parent process writes the string `"hello world\n"` to the pipe, and the child process reads from the pipe and writes to the standard output. The parent process waits for the child process to finish before exiting (line 34).

> [!warning] Why do we close file descriptors on line 21 and 31?
> Every process inherits a copy of all open file descriptors when fork() is called.
This means that after fork(), both the parent and child have access to both pipe ends (pipefd[0] and pipefd[1]). However, each process only needs one end of the pipe. Keeping both open can lead to problems, such as preventing EOF detection or simply wasting resources. To avoid these issues, the parent and child processes should close the ends of the pipe that they don't need.

## `waitpid()`

The `waitpid()` system call suspends the calling process until a child specified by pid argument has changed state. The pid argument can specify a specific child process, or it can be set to -1 to wait for any child process. The options argument can be set to 0 to wait for any child process, or it can be set to WNOHANG to return immediately if no child process has exited.

```c
pid_t waitpid(pid_t pid, int *status, int options);
```

The `pid` parameter can be:
- `-1`: Wait for any child process
- `> 0`: Wait for the specific child process with that PID
- `0`: Wait for any child process in the same process group as the caller
- `< -1`: Wait for any child process whose process group ID equals the absolute value of pid

The `options` parameter is usually one of:
- `0`: Block until a child terminates
- `WNOHANG`: Return immediately if no child has exited

You can also use these macros to check the exit status:
- `WIFEXITED(status)`: True if the child terminated normally
- `WEXITSTATUS(status)`: Returns the exit status of the child if it terminated normally

Example:
```c
int status;
pid_t child_pid = fork();

if (child_pid == 0) {
    // Child process
    exit(42);
} else {
    // Parent process
    waitpid(child_pid, &status, 0);
    
    if (WIFEXITED(status)) {
        printf("Child exited with status %d\n", WEXITSTATUS(status));
    }
}
```

## `wait()`

The `wait()` system call is a simplified version of `waitpid()`. It suspends the calling process until one of its child processes terminates.

```c
pid_t wait(int *status);
```

This is equivalent to calling:
```c
waitpid(-1, status, 0);
```

Example:
```c
int status;
pid_t child_pid = fork();

if (child_pid == 0) {
    // Child process
    exit(0);
} else {
    // Parent process
    wait(&status);
    printf("Child process terminated\n");
}
```

## `execve()`

The `execve()` system call replaces the current process image with a new process image specified by the path argument. This is the function that actually runs commands in your pipex project.

```c
int execve(const char *pathname, char *const argv[], char *const envp[]);
```

- `pathname`: Path to the executable file
- `argv`: Array of argument strings passed to the new program
- `envp`: Array of strings, conventionally of the form key=value, which are passed as environment to the new program

Important: If `execve()` is successful, it **never returns** because the calling process image is replaced by the new process image. If it fails, it returns -1 and sets errno.

Example:
```c
char *args[] = {"ls", "-l", NULL};
char *env[] = {NULL};

if (fork() == 0) {
    // Child process
    execve("/bin/ls", args, env);
    // If execve returns, it failed
    perror("execve failed");
    exit(EXIT_FAILURE);
} else {
    // Parent process
    wait(NULL);
}
```

> [!note]
> In practice, you might want to use functions like `execvp()` which searches the PATH for the executable, or `execlp()` which has a different parameter format but also searches the PATH.

## `unlink()`

The `unlink()` function deletes a name from the filesystem. If that name was the last link to a file and no processes have the file open, the file is deleted and the space it was using is made available for reuse.

```c
int unlink(const char *pathname);
```

This is particularly useful for temporary files that should be automatically removed when your program exits.

Example:
```c
// Create a temporary file
int fd = open("temp_file", O_CREAT | O_RDWR, 0644);
write(fd, "Hello, world!\n", 14);

// Use the file...

// Delete the file
unlink("temp_file");
close(fd);
```

- Success: `unlink()` returns 0.
- Failure: `unlink()` returns -1 and sets errno to indicate the error.

# Implementing Pipex

Now that you understand the basic functions needed for the project, let's see how you might implement the core functionality of the pipex program. The goal is to replicate the behavior of the shell command:

```shell
< infile cmd1 | cmd2 > outfile
```

**To be continued...**