# Contactlist
In this small project, I created a contact database with a contactlist collection and I performed the following http requests
GET, PUT, PATCH, and DELETE
I created a collection using mongosh (mongodb terminal) and also inserting documents directly from mongodb compass (mongodb gui)
I used mongoose and mongodb
I used express framework
I defined a schema and assigned that schema to a model to make sure the documents in the collection followed a constraint
I did the following;
-Displayed all the contacts (get method)
-Displayed all the information about only one person using his ID. (req.params)
-Displayed all the information about only one person using firstname. (req.params)
-Displayed all the contacts with an age >18. (using the comparison operator $gt ie greater than)
-Displayed all the contacts with an age>18 and name containing "ah"(using the comparison operator $gt ie greater than. I also used regex: "ah" to filter documents with "ah" substring )
-Displayed all the contacts with an age<18 and name containing "a" or "h" (using the comparison operator $lt ie less than and the $or operator ie select documents with contact less than 18 or to select documents with  or documents with "a" or "h" using regex: "[ah]". the options:"i" was used to make sure the search was case insensitive ie return a response if the character is in uppercase or lowercase)
-Changed the contact's first name from"Kefi Seif" to "Kefi Anis". (put or patch request)
-Deleted the contacts that are aged under <5. (used the deleteMany method)
The image folder has screenshots of all the responses from the http requests
The port is 3012
