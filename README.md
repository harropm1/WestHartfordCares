# West Hartford Cares
This site, created by Michelle Harrop for HartCode Academy 2019 Capstone, allows visitors to see different volunteer locations and sign up for teams that do work at each of those sites.
## Images
Index Page
![Index Page](/public/images/index.png?raw=true)
Search Page
![Search Page](/public/images/search.png?raw=true)
Edit Team Page
![Edit Team Page](/public/images/edit.png?raw=true)

## Getting Started

This assumes that the user has Node.js installed globally on their machine.

After you have cloned/downloaded this project from GitHub, you will need to open the command prompt and navigate to the folder for this project.
1. You will need to install the Express framework using NPM: `> npm install express --save`
2. Next you will have to install the body-parser package using NPM:  `> npm install body-parser --save`
3. Once those have completed, you will need to launch the server. This is also done in the command prompt, in the project folder. You will need to type: `> node server.js`. 
4. It should respond with: `App listening at port 8081`
5. From here, you will need to navigate to http://localhost:8081/ to view this site.
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## The Site Itself

### index.html
- This is the home page. It contains links to the about and search pages, as well as basic descriptions of a few of the volunteer locations.
- This page also includes a cutout image in the header, a feature I have not used before.
### about.html
- This is the about page. It has information about West Hartford Cares, how it was created, and the various volunteer locations
- This page also includes a parallax, which I have not used before either.

### search.html
- This is the main search page. It will allows volunteers to search by location, where they will be able to see basic details about the teams that do work at that site.
- It also allows visitors to search all of available teams at once.

### details.html
- This page shows volunteers more details about a specific team in cards, including the manager's contact info, the about of people on the team, and the names of the people on the team.
- It also includes buttons:
	1. to allow someone to edit the details about the team
	2. to sign up for the team.

### signup.html
- This page lets the volunteer sign up for a specific team. Some teams have age or gender requirements, and if a person attempts to sign up for a team that they are not eligible for, it will not allow them to sign up.

### newteam.html
- This page allows a volunteer to add a team to work at a specific location. Once that team has been created, other visitors will be able to sign up for that team.

### editteaminfo.html
- This page lets the volunteer edit the information about a particular team. This includes the location they volunteer at, who the manager is, the manager's contact information, etc.
- If the team's age range or gender is changed so that someone on the team would no longer be eligible to be on the team, that change is not allowed, and the edit will not complete.
- This page also lets the volunteer remove the team. It makes them verify that they want to delete the team, and warns them that any volunteers will also be deleted.

### editmember.html
- This page allows the volunteer to edit their contact or demographic information. If the changes they make to their information make them an invalid member of the team, the changes are not saved.
- This page also allows a volunteer to remove members from the team. Again, it prompts the user to verify that they want to delete the volunteer.

## Credits

Images from Google.
Volunteers are all members of Michelle Harrop's family (including at least one dog).
Some of the volunteer locations are fictional, but Westmoor Park does exist. Their website is: [http://www.westmoorpark.org/](http://www.westmoorpark.org/)

## Author

* **Michelle Harrop** - HartCode 2019


## Acknowledgments

* Dana Wyatt (for her guidance and assistance)
* Neo (for water cleanup and being a sounding board)
* John (for giving great layout/styling ideas)
* Cate (for constant optimism, food, and helpful questions)
* Cori (for her Bootstrap skills and design inspiration)
* Adam (for modal assistance)
* Ray (for validation assistance)
* Jeremy (for design inspiration)
* Sudesh (for validation assistance and looking for parenthesis)
* Pam (for server and README.md help)
* Steve (for hilarity and short cuts)
* Sara (for reminders to check for semicolons and spelling)
* Suriya (for reminding me not to take on more than I can handle)
* Vanessa (for data validation checks and style tips)
* Michael (for design inspiration and validation assistance)
* Rob (for reminders to push changes, global-dark-mode help, and working around my wedding)
* Denise (for checking in with us, arranging for visitors, and working around my wedding)
* Renisa (for checking in with us, arranging for visitors, and working around my wedding)
* Franca (for supporting us, arranging for visitors, and working around my wedding)