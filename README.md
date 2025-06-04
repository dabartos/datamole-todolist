# datamole-todolist

I have spent about 6 hours as intended but I think I ran out. I encountered several issues. One was a broken environment (I wasn't able to make storybook run, there were some dependency issues and I needed to take a look at it since in the task it says the existing components should be thought of as pure components and I got confused and thought it means I can't touch anything.)
Since I thought I can't touch what's already there I started making a hook.

After some time I realized that I will have to touch some of the components anyway because making extra wraps for everything only to add a class or two seemed just wrong. In the end I decided to go with the hook since I already started working on it so the functionality is all in there. I took a look at the setup and nothing seemed memoized or other so I wasn't thinking about performence that much. Other than that I added some design tweaks as asked in readme but I have a bad eye for these things and if I started to really poke in it it would probably end up ugly looking so I just fixed what I saw.
