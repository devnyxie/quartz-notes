---
title: Logarithms
tags:
  - math
  - algorithm
---


# Logarithms

Logarithms are the *inverse* (opposite) of exponentiation. When we say `log_b(x) = y`, it means `b^y = x`.

## Base-2 Logarithm

In computer science, we mostly use base-2 logarithms (log₂) because computers work with binary. <br/>
When you see `log₂(8) = 3`, it means:

```text
2³ = 2 × 2 × 2 = 8
```

### Examples

| Number (n) | log₂(n) | Because    |
|------------|---------|------------|
| 2          | 1       | 2¹ = 2    |
| 4          | 2       | 2² = 4    |
| 8          | 3       | 2³ = 8    |
| 16         | 4       | 2⁴ = 16   |
| 32         | 5       | 2⁵ = 32   |
| 64         | 6       | 2⁶ = 64   |
| 128        | 7       | 2⁷ = 128  |

This is particularly important for algorithms like [Binary Search](studies/algorithms/binary_search.md) where we divide the input size by 2 at each step.

## Calculating log₂

To calculate log₂ of a number:
1. Keep dividing by 2
2. Count the divisions until you reach 1
3. The count is your answer

For example, log₂(32):
```text
32 ÷ 2 = 16  (count: 1)
16 ÷ 2 = 8   (count: 2)
8 ÷ 2 = 4    (count: 3)
4 ÷ 2 = 2    (count: 4)
2 ÷ 2 = 1    (count: 5)
```
Therefore, log₂(32) = 5
