def reverse_string(s: str) -> str:
    """
    Reverses a given string using recursion.

    Why recursion over slicing:
    We chose recursion here primarily as an illustrative, algorithmic exercise. 
    While Python's slicing syntax (s[::-1]) is highly optimized, implemented in C, 
    and is the industry-standard idiomatic approach for reversing strings in production code,
    recursion provides a pure, conceptual demonstration of how problems can be decomposed.
    
    By breaking down the string reversal into:
      1. A base case (an empty string or a single character returns itself)
      2. A recursive step (taking the rest of the string, reversing it, and appending the first character)
    we demonstrate the recursive call stack, the inductive definition of the problem,
    and a functional programming approach without state mutations.
    """
    # Base case: if the string is empty or has only one character, it is already reversed.
    if len(s) <= 1:
        return s
    
    # Recursive step: reverse the rest of the string, and append the first character to the end.
    return reverse_string(s[1:]) + s[0]


if __name__ == "__main__":
    # Simple test cases to verify the implementation
    test_cases = ["hello", "Python", "a", "", "recursion"]
    for test in test_cases:
        reversed_test = reverse_string(test)
        print(f"Original: '{test}' -> Reversed: '{reversed_test}'")
        assert reversed_test == test[::-1], f"Failed for {test}"
    print("All tests passed successfully!")
