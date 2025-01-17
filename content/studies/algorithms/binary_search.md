---
title: Binary Search
tags:
  - c
  - algorithm
---

Binary search is a search algorithm that finds the position of a target value within a **sorted** array. <br/>
It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating this until the target value is found. If the search ends with the remaining half being empty, the target is not in the array.

## Time Complexity

- Time complexity: O(log n)

Why? Because at each step, the size of the array is reduced by half. Therefore, the time complexity is logarithmic.

## Implementation in C

```c
int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid potential overflow

        if (arr[mid] == target) {
            return mid; // target found
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

`left + (right - left)` is used to avoid potential [[studies/c/int_overflow|Integer Overflow]] (See **Detailed Review** section) when `left` and `right` are large integers.
For example, if `left` is `INT_MAX` (2147483647) and `right` is `INT_MAX - 1` (2147483646), then `left + right` will overflow:
```text
2147483647 + 2147483646 = -3
```
However, `left + (right - left)` will not overflow in this case:
```text
2147483647 + (2147483646 - 2147483647) = 2147483647 + (-1) = 2147483646
```


# Flow Example 1

```c
//                       ▼
int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
```

1. **Iteration 1**:
    - `left = 0`, `right = 9`, `mid = 4, target = 9 (value)`
    - `arr[mid] = 9`
    - `arr[mid] == target`, return `4`

# Flow Example 2



1. **Iteration 1**:
    - `left = 0`, `right = 9`, `mid = 4, target = 19 (value)`
    ```c
    // mid:                  ▼
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    ```
    - `arr[mid] = 9`
    - `arr[mid] < target`, `left = mid + 1 = 4 + 1 = 5`
2. **Iteration 2**:
    - `left = 5`, `right = 9`, `mid = 7 (recalculated), target = 19 (value)`
    ```c
    // mid:                             ▼
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    ```
    - `arr[mid] = 15`
    - `arr[mid] < target`, `left = mid + 1 = 7 + 1 = 8`
3. **Iteration 3**:
    - `left = 8`, `right = 9`, `mid = 8 (recalculated), target = 19 (value)`
    ```c
    // mid:                                  ▼
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    ```
    - `arr[mid] = 17`
    - `arr[mid] < target`, `left = mid + 1 = 8 + 1 = 9`
4. **Iteration 4**:
    - `left = 9`, `right = 9`, `mid = 9 (recalculated), target = 19 (value)`
    ```c
    // mid:                                      ▼
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    ```
    - `arr[mid] = 19`
    - `arr[mid] == target`, return `9`
