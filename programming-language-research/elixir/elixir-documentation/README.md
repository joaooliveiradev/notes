<samp>

### About

So, i have the idea to study Elixir by using the [Livebook](https://livebook.dev/) that is an interactive notebook build in Elixir that make a lot of things like run machine learning models, visualize data, and much more, but one thing that i thought that will help the studies it's the hability of run code inside of it, you can make interative while you making the annotations, that's impressive.

#### Instructions:

So, to have just the markdowns files, i'm using livebook throught escript, it's very convenient for run just local.

Assuming that you already have Elixir and Erlang installed, you need to run these commands to install livebook via escript:

```elixir
    mix do local.rebar --force, local.hex --force
    mix escript.install hex livebook

    # Start the Livebook server
    livebook server
```

After the server starts, open the livebook in your browser and open of the markdowns of this project.

</samp>
