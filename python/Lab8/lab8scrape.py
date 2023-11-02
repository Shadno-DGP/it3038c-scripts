import requests, re

from bs4 import BeautifulSoup

data = requests.get("https://thefirstedition.com/shop/").content

soup = BeautifulSoup(data, 'html.parser')

x = 0
products = soup.find_all("h2", {"class":"woocommerce-loop-product__title"})
prices = soup.find_all("span", {"class":"price"})

for p in products:
	title = products[x].text
	price = prices[x].text
	print("The "+ title+ " item is priced at " +price)
	x = x+1

