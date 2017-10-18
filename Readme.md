## **Allegro Title**

The main idea behind this project is to create low cost gadget and service, that connects your car sensors (OBD, GPS, Accelerometer) to the cloud.
And build a cloud services around it.


## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.


## **Prerequisites and installing**

U need to do a few things to install the software:
1. Download and install [.dotnet core](https://www.microsoft.com/net/download/core).
	Here is [installation guide for installing on Linux](https://www.microsoft.com/net/core#linuxredhat).
	Here is [installation guide for installing on Windows](https://www.microsoft.com/net/core#windowscmd).
	Here is [installation guide for installing on MacOS](https://www.microsoft.com/net/core#macos).
2. Download and install IDE for writing/edit code. It could be [Microsoft Visual Studio](https://www.visualstudio.com/downloads/),
 or [VS Code](https://code.visualstudio.com/download).
 	Here is using guide for [VS Code on Linux](https://code.visualstudio.com/docs/?dv=linux64_deb).
	Here is using guide for [VS Code on Windows](https://code.visualstudio.com/docs/?dv=winzip).
	Here is using guide for [VS Code on MacOS](https://code.visualstudio.com/docs/?dv=osx).
	For using Visual Studio u must choose the edition u want to use, choose a version, download and install by default installation settings.
	Visual Studio Community is free but not for a proffesional activity.
3. Settings for dev environment can be default. By installing u don't need to choose custom installation.
4. Clone repository by downloading it or using GIT(if it's not installed, please install it, here is 
	[installation guide](https://git-scm.com/book/ru/v1/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git)), 
	open and run solution or project(.sln file).
5. Restore packages, if auto restoring failed. Build and Debug.


## **Running the tests**

There are no automated tests for this system yet.


## **Deployment**

After the project has been cloned, dotnet core installed, you need to enter to a root directory of project and run command: "npm i".
This command installs a package, and any packages that it depends on. Then u need to restore dotnet packages by a command: "dotnet restore".
After it u can easily publish your project to .dll files. Run: "dotnet publish". After it u will get a .dll files in "/bin/Debug/netcoreapp2/publish/" folder.
This files are required for further deployment.

About hosting and deployment in dotnet core u can read [here](https://docs.microsoft.com/en-us/aspnet/core/publishing/?tabs=aspnetcore2x).
About set up a hosting environment for asp.net core on linux with nginx, and deploy to it u can read [here](https://docs.microsoft.com/en-us/aspnet/core/publishing/linuxproduction?tabs=aspnetcore2x).

	About Nginx configuration:
	
	To configure Nginx as a reverse proxy to forward requests to our ASP.NET Core application, modify "/etc/nginx/sites-available/default".
	Open it in a text editor, and replace the contents with the following:
		
		server {
    		listen 80;
    		location / {
       			proxy_pass http://localhost:5000;
        		proxy_http_version 1.1;
        		proxy_set_header Upgrade $http_upgrade;
        		proxy_set_header Connection keep-alive;
        		proxy_set_header Host $host;
        		proxy_cache_bypass $http_upgrade;
    		}
		}
		
	This Nginx configuration file forwards incoming public traffic from port 80 to port 5000.
	Once you have completed making changes to your Nginx configuration, you can run: "sudo nginx -t" to verify the syntax of your configuration files.
	If the configuration file test is successful, you can ask Nginx to pick up the changes by running: "sudo nginx -s reload".
	
	About services:
	
	Nginx is now setup to forward requests made to "http://yourhost:80" on to the ASP.NET Core application running on Kestrel at "http://127.0.0.1:5000".
	However, Nginx is not set up to manage the Kestrel process. You can use systemd and create a service file to start and monitor the underlying web app.
	systemd is an init system that provides many powerful features for starting, stopping, and managing processes.
	
	Create the service definition file by running: "sudo nano /etc/systemd/system/kestrel-hellomvc.service".
	The following is an example service file for our application:
	
		[Unit]
		Description=Example .NET Web API Application running on Ubuntu

		[Service]
		WorkingDirectory=/var/aspnetcore/hellomvc
		ExecStart=/usr/bin/dotnet /var/aspnetcore/hellomvc/hellomvc.dll
		Restart=always
		RestartSec=10  # Restart service after 10 seconds if dotnet service crashes
		SyslogIdentifier=dotnet-example
		User=www-data
		Environment=ASPNETCORE_ENVIRONMENT=Production 

		[Install]
		WantedBy=multi-user.target
		
	Note: If the user www-data is not used by your configuration, the user defined here must be created first and given proper ownership for files.
	Save the file, and enable the service by running: "systemctl enable kestrel-hellomvc.service".
	Start the service and verify that it is running.	
		
		systemctl start kestrel-hellomvc.service
		systemctl status kestrel-hellomvc.service

		● kestrel-hellomvc.service - Example .NET Web API Application running on Ubuntu
    		Loaded: loaded (/etc/systemd/system/kestrel-hellomvc.service; enabled)
    		Active: active (running) since Thu 2016-10-18 04:09:35 NZDT; 35s ago
		Main PID: 9021 (dotnet)
    		CGroup: /system.slice/kestrel-hellomvc.service
           			└─9021 /usr/local/bin/dotnet /var/aspnetcore/hellomvc/hellomvc.dll
						
	With the reverse proxy configured and Kestrel managed through systemd, the web application is fully configured and can be accessed from a browser
	on the local machine at "http://localhost". It is also accessible from a remote machine, barring any firewall that might be blocking. 
	Inspecting the response headers, the Server header shows the ASP.NET Core application being served by Kestrel.
	
		HTTP/1.1 200 OK
		Date: Tue, 11 Oct 2016 16:22:23 GMT
		Server: Kestrel
		Keep-Alive: timeout=5, max=98
		Connection: Keep-Alive
		Transfer-Encoding: chunked
		


## **Built With**

1. ASP.NET Core 2.0 - The web framework used.
2. Dapper, EF Core - The web ORM's used.
3. NuGet - Dependency Management.
4. Npm - Front-End package manager.


## **Contributing**

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.


## **Versioning**

We use SemVer for versioning. For the versions available, see the tags on this repository.


## **Authors**

See also the list of contributors who participated in this project.


## **License**

This project is licensed under the MIT License - see the LICENSE.md file for details.