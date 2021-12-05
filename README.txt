1. import MYSQL database to local computer (folder --> Database)
	(MySQL server must be installed on local computer.
		https://www.simplilearn.com/tutorials/mysql-tutorial/mysql-workbench-installation)

2. folder server --> File Index --> adjust database access 

const dbUser = mysql.createConnection({
    user:'HERE_YOUR_USERNAME',
    host:'HERE_YOUR_LOCALHOST',
    password:'HERE_YOUR_PASSWORD',
    database:'tapstrapapp',

});

3. enter the following commands in the server folder:

	- npm install
	- npm start

4. in the folder Client enter the following commands:
	- npm install
	- npm start

5. open internet browser -->(http://localhost:3000/Learn2Tap)

6.To use the application to its full extent, download the TapStrap mapping 'Lern2Tap-Mapping'.

