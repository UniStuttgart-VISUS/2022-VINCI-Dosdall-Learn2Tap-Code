1. import MYSQL database to local computer (folder --> Database)
	(MySQL server must be installed on local computer.
		https://www.simplilearn.com/tutorials/mysql-tutorial/mysql-workbench-installation)

2. Execute the files from the database folder to create the database.	

3. folder server --> File Index --> adjust database access 

const dbUser = mysql.createConnection({
    user:'HERE_YOUR_USERNAME',
    host:'HERE_YOUR_LOCALHOST',
    password:'HERE_YOUR_PASSWORD',
    database:'tapstrapapp',

});

4. enter the following commands in the server folder:

	- npm install
	- npm start

5. in the folder Client enter the following commands:
	- npm install
	- npm start

6. open internet browser -->(http://localhost:3000/Learn2Tap)

7.To use the application to its full extent, download the TapStrap mapping 'Lern2Tap-Mapping'.

