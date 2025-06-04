# datamole-todolist

I have spent about 6 hours on it as intended. 

I encountered several issues, sorted from most bothersome to least:
- broken environment: I wasn't able to make storybook run, there were some dependency issues and I needed to take a look at it since in the task it says the existing components should be thought of as pure components so thought it means I can't touch anything. I spent about 90 minutes figuring out what was the issue.
- figuring out how to start: since I thought (and still sort of do) I can't replace List and with Footer and Header having a say in how the list behaves I decided to make a hook instead of a component.
- closure issues with items state: on deleting items I used a cached items array in a function.
- thinking about the fact nothing is memoized and I am replacing the whole state array every time any change happens and trying to come up with a solution to it but failing (not enough time I guess)

After some time I realized that I will have to touch some of the components anyway because making extra wraps for everything only to add a class or two seemed just wrong.
In the end I decided to go with the hook since I already started working on it so the functionality is all in there. I took a look at the setup and nothing seemed memoized or other so I wasn't thinking about performence that much. Other than that I added some design tweaks as asked in readme but I have a bad eye for these things and if I started to really poke in it it would probably end up ugly looking so I just fixed what I saw.
