###Windows (cmd.exe)
to run use `telnet 162.243.206.236` in cmd.exe

if it shows an error you probably need to enable telnet 
https://kb.ctera.com/article/how-to-open-a-telnet-session-on-windows-7-or-windows-8-os-16.html

###Everything else
don't really know if they work, cmd has this weird thing where it sends each character you type so it'd be great if someone good test it out in terminal

###The game
they're several built-in commands

`name [your name]` gives you a name, can only use once
`say [sentence]` chat to the people in the same room as you
`quit` leave game
`examine` describes the room your in

and every object has its own commands
chair (also called toilet and sofa in game)

- sit [...] [chair name (toilet, sofa, chair, etc)
- get off [...] [chair name]
- examine

doors (one is called north door, one south door, and one hole)

- use [door name]
- examine

bed (only one, called bed)

 - inherits all commands from chair
 - sleep [...] [bed name]

all objects

- pick up [object name]

Note: even tho I put in the [...] thats meaningless the parser just looks for the command at the start of your input and the name of the object somewhere in the input, you can put whatever words you want in to make it make sense. 
