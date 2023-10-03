print("Welcome to my numbe guessing game. You will be guessing a random number between 1 and 10,000. The game will record if the number is higher or lower, and the number of guesses it takes you to find the real number. Good luck!")

import math
import random
import sys

number = random.randint(1,10000)
guessAttempts = 0


def guess():

	guess = int(input("Input your guess!"))
	global guessAttempts
	guessAttempts = guessAttempts + 1
	if guess == number:
		print("Congrats! You guessed the number in "+str(guessAttempts)+ " attempts")
		sys.exit()
	elif guess < number:
		print("The number is Higher!")
	elif guess > number:
		print("The number is Lower!")
while guess != number:
	guess()
