#Telnet Fantasy RPG Game
##By Spencer, Jared, and Joseph

##How To Use:
###Windows (cmd.exe)
First you must stet up the server by navigating to the directory you have downloaded this game into in cmd.exe.
Type `node app` to enable the server that your game will be played on.
To run the game use `telnet localhost 6283` in a seperate cmd.exe.

If it shows an error you probably need to enable telnet :
https://kb.ctera.com/article/how-to-open-a-telnet-session-on-windows-7-or-windows-8-os-16.html

###Everything else
We Don't really know if they work, cmd has this weird thing where it sends each character you type, so it'd be great if someone good test it out in terminal for Linux/Mac OS

###The game
####There are several built-in commands:

`name [your name]` gives you a name, can only use once
`say [sentence]` chat to the people in the same room as you
`quit` leave game
`examine` describes the room your in

Every object also has its own commands:
#####chair (also called toilet and sofa in game)

- sit [...] [chair name (toilet, sofa, chair, etc)
- get off [...] [chair name]
- examine

#####doors (north, south, east and west)

- use [door name]
- examine

#####bed (only one, called bed)

 - inherits all commands from chair
 - sleep [...] [bed name]

All objects:

- pick up [object name]

Note: even though I put in the [...], the parser just looks for the command at the start of your input and the name of the object somewhere in the input, so you can put whatever words you want in the middle to make it make sense. 
