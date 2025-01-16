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

## Implementation

```c
int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // Avoid potential overflow

        if (arr[mid] == target) {
            return mid; // Target found, return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return -1; // Target not found
}

