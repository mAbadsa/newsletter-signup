const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
// const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index');
})
app.post('/', (req, res) => {
	const fName = req.body.firstName;
	const lName = req.body.lastName;
	const email = req.body.email;

	let data = {
		"members": [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					"FNAME": fName,
					"LNAME": lName
				},
			}
		]
	}

	let jsonData = JSON.stringify(data);

	const option = {
		url: 'https://us4.api.mailchimp.com/3.0/lists/a828e58487',
		method: "POST",
		headers: {
			"Authorization": "Muhammad ef8ca3ed43f39708c874e775587f128c"
		},
		body: jsonData
	}

	request(option, (err, response, body) => {
		if (err) {
			// res.send("There was an error with signing up, Please try again!");
			res.render('failure');
		} else {
			if (response.statusCode === 200) {
				// res.send("Successfully subscribed!");
				res.render('success');
			} else {
				// res.send("There was an error with signing up, Please try again!");
				res.render('failure');
			}
		}
	});
})

app.post('/failure', (req, res) => {
	res.redirect('/');
})

app.listen(port, () => {
	console.log("Server is running on port", port);
})



//ef8ca3ed43f39708c874e775587f128c-us4

//a828e58487