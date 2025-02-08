---
title: Ruby Q&A
tags:
  - ruby
date: 2025-01-11
---
![[attachments/ruby/ruby_logo.svg|50]]

Ruby is a dynamic, object-oriented programming language known for its simplicity and focus on developer productivity. 

# Key Features
- **Minimalistic Syntax**: Ruby's syntax has an appeasing natural language style. This, paired with its dynamic typing, powerful metaprogramming features, and absence of semicolons, results in clean and expressive code.
- **Gems**: Ruby's package manager, RubyGems, simplifies library management, making it easy to integrate numerous third-party extensions.
- **Database Integration**: ActiveRecord, a popular object-relational mapping system, aids in managing database records via a natural, object-oriented interface.
- **MVC Pattern**: Rails, in particular, is famed for its adherence to the Model-View-Controller pattern, offering a clear separation of concerns.
- **Test-Driven Development**: RoR promotes  -testing practices from the project's inception, ensuring reliability.

# Q&A

# Ruby on Rails Routing
```ruby
# config/routes.rb
Rails.application.routes.draw do
  root 'welcome#index'
  get 'products/:id', to: 'products#show'
  resources :articles
end
```
This file configures routes for different URLs, specifying which controllers and actions to invoke. For instance, upon receiving a GET request for products/5, RoR would route it to the show action in the ProductsController with the ID parameter set to 5. Such straightforward setups contribute to RoR's appeal.

<hr/>

# Scripts
## Command-Line Arguments
```ruby
# script_with_args.rb
puts "Arguments: #{ARGV.join(', ')}"
```
Ruby scripts can access command-line arguments via the ARGV array. In the example above, running `ruby script_with_args.rb arg1 arg2` would output "Arguments: arg1, arg2".

## Interactive Scripts
Ruby scripts can engage with users using the gets method.
```ruby
# interactive_script.rb
print "Enter your name: "
name = gets.chomp
puts "Hello, #{name}!"
```

## Background Processing
If you want a script to run in the background without blocking your command line, you can use the `&` character.

For instance, to run a script called background_script.rb in the background, you can use:

```bash
ruby background_script.rb &
```

## Ruby Shell
For more complex shell operations, Ruby offers the shell library.


```bash
require 'shell'

# Use 'open' to open a URL in your default browser.
sh = Shell.new
sh.open "https://example.com"
```

<hr/>

# Basic Types
**Ruby** is claimed to treat "everything as an object". But like many languages, Ruby has both **primitive** and **abstract data types**.

## Primitive Types

- **Numbers**:
  - **Integers** can be of any size (limited by system memory).
  - **Floating-Point** numbers follow the IEEE 754 standard.
- **Booleans**: Represented by `true` and `false`.
- **Symbols**: Unique, immutable identifiers represented with a `:` followed by a name.

## Abstract Types

- **Strings**: Unicode with multiple encodings.
- **Arrays**: Ordered, indexed collections.
- **Hashes**: Key-value pairs, also known as dictionaries or maps in other languages.

## Others assimilated Primitive Types

Ruby, despite its philosophy of being completely object-oriented, has some underlying **primitive paradigms** due to its performance concerns and efficiency considerations.

- **nil**: Represents 'nothing' or 'empty'. It's the only instance of `NilClass`.

- **Booleans**: While `true` and `false` are themselves keywords, any other value in Ruby is considered truthy in a conditional context.

## Ruby's Flexibility

Ruby shuns a "strictly-typed" system. **Variables need not be declared upfront** and can be reassigned to different types during execution. This freedom, although liberating, can lead to unexpected behavior, especially in larger codebases.

## _symbols_ vs _strings_

**Ruby** features both strings and **symbols**, each with distinct use cases.

### Key Distinctions

- **Type**: Strings are of class `String`, while symbols are instances of `Symbol`.
- **Mutability**: Strings are mutable, symbols are not.
- **Memory**: Symbols are stored as a single, unique object in memory, while each string is unique.
- **Performance**: As symbols are immutable, **lookups** are faster than for equivalent strings.

### Primary Usages

- **Strings**: For text and dynamic data that may change or be unique across different objects or occurrences.
- **Symbols**: Typically used as keys for hashes or unique identifiers in the program. They're advantageous for **lookup efficiency** and when the actual content of the identifier is less relevant than its unique identity.

### Memory Considerations

- As symbols are **stored only once** in memory, they are memory-efficient in certain scenarios, like using the same symbol across different objects or operations. Be cautious, though, as unnecessarily creating a large number of symbols can lead to memory bloat.
- Strings may be more memory-intensive, especially when there are numerous unique strings. However, they are the right choice when dealing with data that genuinely varies or where mutability is required.

### Code Example: String vs Symbol

Here is the Ruby code:

```ruby
# Strings
str_1 = "Hello"
str_2 = "Hello"
puts str_1.object_id == str_2.object_id  # Output: false

# Symbols
sym_1 = :hello
sym_2 = :hello
puts sym_1.object_id == sym_2.object_id  # Output: true
```

In the example above, the two string instances have different object IDs, while the two symbol instances share the same object ID. Why? Because symbols are **interned** and stored only once in memory. Therefore, the symbol `:hello` is the same object in both cases. If we were to create a new symbol `:world`, it would have a different object ID though it would be the same for all instances of `:world`.

<hr/>

## Constants

In Ruby, you declare a constant by using all uppercase letters. Constants are subject to lexical scoping. While **reassignment** is technically possible (spawning a warning), it should be avoided as a practice.

### Constant Declaration

You can declare a Ruby constant using `Object::CONSTANT` notation or by assigning a **value directly to an identifier**.

#### Code Example: Constant Declaration 

```ruby
# Using Object::CONSTANT notation
# PI is a constant within the Math module
# The :: (scope resolution operator) is used to access consts/methods within a module/class.
Math::PI 

# Direct assignment
RADIUS = 5.0

puts Math::PI
puts RADIUS
```

### Constant Scope

Constants have a **global scope**, but their visibility can be restricted within classes and modules.

#### Global VS. Local Scope

- **Global Scope**: Constants are accessible throughout the entire application.
  ```ruby
  A = 1     # Top level
  module M
    puts A  # Outputs: 1
  end
  ```

- **Local Scope**: Constants are defined within a module or a class.
  ```ruby
  module M
    A = 2
    A = 3
    puts A  # Outputs: 3
  end
  ```

<hr/>

## '_require_' and '_include_'

**Ruby** uses both **Require** and **Include** to manage dependencies and to mix modules into classes.

### Require

- **Purpose**: Loads external libraries, enabling access to their defined classes and modules.

- **Execution**: Done at the top of the file or script.

- **Trigger**: A `LoadError` is raised if the required file is not found.

- **State Management**: Tracks loaded libraries, subsequently ignoring further `require` calls for the same library.

### Example: Using Require

Here is the Ruby code:

```ruby
# In file application.rb
require 'my_library'

# In file my_library.rb
class MyLibrary
  def self.my_method
    puts "Hello from MyLibrary!"
  end
end
```

### Include

- **Purpose**: Integrates a module's methods within a class, giving the class access to those methods.
- **Execution**: On the specific class that necessitates the module's functionality.
- **State**: Not applicable for classes, as they can include multiple modules.

#### Why is it Used?

- **Require**: Ensures the presence of the external library before continuing, a basic necessity for external code.
- **Include**: Mixes in module functionality only when needed, aligning with Rails' convention of using it in the classes contextually.

So, while `require` is used for loading libraries, `include` is used for mixing functionality into classes. For example, in Rails, `include` is used to add functionality to models or controllers.

#### Example 1
```ruby
# In file application.rb
require 'my_library'

class MyClass
  include MyLibrary
end
# MyClass now has access to MyLibrary's methods
``` 

#### Example 2
```ruby
# include one local class into another
class A
  def class_a_method
    puts "Hello from A!"
  end
end

class B
  include A
  def class_b_method
    puts "Hello from B!"
  end
end

B.new.class_a_method  # Output: "Hello from A!"
```

<hr/>


# Sources
- [ruby-interview-questions](https://github.com/Devinterview-io/ruby-interview-questions)