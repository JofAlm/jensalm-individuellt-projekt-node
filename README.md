# jensalm-individuellt-projekt-node

Airbean API
This is a REST API for the Airbean API exam, built with Node.js and Express and using NeDB as the database. The API provides functions for managing menus, orders, users, carts, as well as administering the products in the menu and handling promotions.

Installation
Install dependencies:
		npm install
	2. 	node index.js

Usage
User Management
Register a new user
Endpoint: /user/register
Method: POST
Body:

		{
  			"username": "newuser",
  			"password": "password"
		}

Log in as a user
Endpoint: /user/login
Method: POST
Body:

		{
  			"username": "admin",
  			"password": "adminpassword"
		}




Menu
Get the entire menu
Endpoint: /menu
Method: GET
Company Information
Get company information
Endpoint: /about
Method: GET


Cart
Add a product to the cart
Endpoint: /cart
Method: POST
Body:

		{
  			"title": "Bryggkaffe",
  			"price": 39
		}

View the contents of the cart
Endpoint: /cart
Method: GET
Remove a product from the cart
Endpoint: /cart/:id
Method: DELETE







Orders
Create an order (Logged-in user)
Endpoint: /order
Method: POST
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN
Body:

		{
  			"title": "Bryggkaffe",
  			"price": 39
		}

Create an order (Guest)
Endpoint: /order/guest
Method: POST
Body:

		{
  			"title": "Bryggkaffe",
  			"price": 39
		}


Get all orders for a user
Endpoint: /order/user/:userId
Method: GET
 Get a specific order
Endpoint: /order/:orderId
Method: GET







Admin Functions
Add a new product to the menu
Endpoint: /admin/product
Method: POST
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN
Content-Type: application/json
Body:
			{
  				"id": 7,
  				"title": "Espresso",
  				"desc": "Strong and rich coffee.",
  				"price": 45
			}

Update a product in the menu
Endpoint: /admin/product
Method: PUT
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN
Content-Type: application/json
Body:

{
  "id": 7,
  "title": "Espresso",
  "desc": "Even stronger coffee.",
  "price": 50
}

Delete a product from the menu
Endpoint: /admin/product/:id
Method: DELETE
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN
Content-Type: application/json

Get all products in the menu
Endpoint: /admin/products
Method: GET
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN


Promotions
Add a promotion
Endpoint: /admin/campaign
Method: POST
Headers:
Authorization: Bearer YOUR_GENERATED_TOKEN
Content-Type: application/json
Body:

{
  "products": [1, 2],
  "campaignPrice": 70
}


This README provides an overview of how to install, run, and use the various functions of the project.
