## Prerequisites

- Java JDK (https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- Compile Programm with JDK Compiler (javac)

## Run the code
`cd '<ProjectDir>; & java '-cp' '<compileDir>' 'Main'`
`or use your IDE to run it. (you need to set up the java compiler first)`

## Idea Behind it:
- Read in the input (saved as input.txt);
- Go over every Row and extract the range of each elf
- Call Method to check if one elfs range is completely in the other elfs range then return true
- Call Second Method to check if a part of one elfs range overlaps a part of the other elfs range
- Print out the answers to the console.