---
title: Ruby Q&A
tags:
  - ruby
date: 2025-01-11
---
![[attachments/ruby/ruby_logo.svg|50]]

Ruby is a dynamic, object-oriented programming language known for its simplicity and focus on developer productivity. 

# Key Features
- **Syntax**: Ruby's syntax has an appeasing natural language style. This, paired with its dynamic typing, powerful metaprogramming features, and absence of semicolons, results in clean and expressive code.
- **Gems**: Ruby's package manager, RubyGems, simplifies library management, making it easy to integrate numerous third-party extensions.
- **Database Integration**: ActiveRecord, a popular object-relational mapping system, aids in managing database records via a natural, object-oriented interface.
- **MVC Pattern**: Rails, in particular, is famed for its adherence to the Model-View-Controller pattern, offering a clear separation of concerns.
- **Test-Driven Development**: RoR promotes best-testing practices from the project's inception, ensuring reliability.

# Code Example: Ruby on Rails (RoR) Routing
```ruby
# config/routes.rb
Rails.application.routes.draw do
  root 'welcome#index'
  get 'products/:id', to: 'products#show'
  resources :articles
end
```
This file configures routes for different URLs, specifying which controllers and actions to invoke. For instance, upon receiving a GET request for products/5, RoR would route it to the show action in the ProductsController with the ID parameter set to 5. Such straightforward setups contribute to RoR's appeal.

# Sources
- [ruby-interview-questions](https://github.com/Devinterview-io/ruby-interview-questions)