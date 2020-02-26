.. getting started

Getting Started
===============

To get the right tools
^^^^^^^^^^^^^^^^^^^^^^

Welcome in the team !

We're using several tools to facilitate teamwork,there are the steps to follow to be up-to-date and ready to work :) .

Wi-fi
You need to go on the entrance to get a log-in and password, the process is explained there.

Email @vittascience.com
You will receive an Vittascience email account on the shape first-name@vittascience.com, who will be needed for the nexts steps.

Email manager
We recommend Thunderbird to manage with IMAP all the adresses first_name@vittascience.com as well as your personnal adresses. Beside the good point of having an unified interface, the searching tool become priceless when you don't know on which adresses you got an answer.

If needed, the email can be managed from OVH Mail ,with one of the three online managers RoundCube, Horde ou SquirelMail. We recommend RoundCube, who has the best easy-to-use/deepness ratio The Horde interface is awfull but is more moddable, and SquirelMail is simpler but poorer.

Intern communication
Slack is our intern communicational tool. You can access our group with your adress first-name@vittascience.com, by clicking this link : https://vittascience.slack.com/signup

Task manager
We use Trello to manage the tasks as an interactive board. You can sign in on Trello to access the Main Board by clicking on this invitation .
If it don't work, ask an invitation to access to the Main Board.

Planning
To learn the agendas of everyone, we maintain an Google Calendar "Vittascience". Ask an invitation to access the calendar.

Folders and files
All non-coding files and folders are saved on the [Google Drive Vittascience(https://drive.google.com/drive/folders/0B5UXaLEtjB9_dnUwa184R2tqR0U) . We give reading rights to everyone, and writing rights on demand.

Some advice, download the software "Sauvegarde et synchronisation" who allow to manage the Drive's files locally on your computer.

Website hosting
OVH is our site's host and give us access to the domain names vittascience.com and vittascience.org. Our compilation server for IDE and the backup saves are hosted there too.

Administrator rights
To have access on the website's dashboard, ask to another administrator

Accounting
The acounting is managed by the office GMBA, with the software QuickBooks .

Formerly, on OneUp and on this GoogleSheet.

CRM
Commercials contacts are groupped on Google Sheet.

Formerely, on HubSpot , free CRM (Customer Relationship Management).

== Emailing et Newsletter == We are actualy using MailerLite and MailChimp, free below 2000 destinataires per month.

Setup project environment
^^^^^^^^^^^^^^^^^^^^^^^^^

Congratulations you were given access to our project's code base!

To start contributing to Vittascience project you need to clone this repository. To build and launch a local version of Vittascience platform on your browser. First start with environment and project setup.

Environment
In section we will see how we can setup a virtual host for both Windows and Linux.

Windows
Set a virtual host :

Install wamp

Launch it

On localhost page, click "Tools --> Add a virtualhost"

Name : "vittascience"

Path : your path (C:/wamp/www/vittascience for example, be carefull to use frontslash and not backslash)

Validate

Right-click wamp tooltip-->Tools-->Restart DNS

When you get on localhost again, choose your virtual host

Linux (ubuntu)
Install apache2

 sudo apt-get update
 sudo apt-get install apache2
The first step that we are going to take is to make a directory structure that will hold the site data.

 sudo mkdir -p /var/www/vittascience
Make sure permissions are granted for user not only for root.

 sudo chown -R $USER:$USER /var/www/vittascience
 sudo chmod -R 755 /var/www
Create new Virtual Host files, Virtual Host files are the files that specify the actual configuration of our virtual hosts and dictate how the Apache web server will respond to various domain requests.

 sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/vittascience.conf
Open the new file in your editor with root privileges:

 sudo nano /etc/apache2/sites-available/vittascience.conf
Delete all the content, and copy paste the following.

 <VirtualHost *:80>
     ServerName vittascience
     DocumentRoot /var/www/vittascience/
     <Directory  /var/www/vittascience/>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
     </Directory>
 </VirtualHost>
Now that we have created our virtual host files, we must enable them. Apache includes some tools that allow us to do this.

We can use the a2ensite tool to enable each of our sites like this:

 sudo a2ensite vittascience
Restart Apache

 sudo service apache2 restart
Project
Clone the latest version of our application using git clone https://github.com/Leobriand31/vittascience.

Make a private folder and create db_config.php under it.

mkdir private

cd private/

touch db_config.php

Open db_config.php and paste the following while changing with your own parameters.

define("VS_DB_HOST","vittascience"); define("VS_DB_PORT","3306"); define("VS_DB_NAME","vittascience"); define("VS_DB_USER","root"); define("VS_DB_PWD","");

Create a googlecaptchakey.php file in the same directory and paste the following code :
define("CAPTCHA_SECRET","6LePcG8UAAAAAOg-S1Lhx8k1HGk7HN5gvG1eJNeZ"); define("CAPTCHA_PUBLIC_KEY","6LePcG8UAAAAAKX0zhtg86adz_ABg_d-n_EN4VFz");

Create a private.pem file in the same directory and paste the following code :
-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEAs4Y8UQKIuXnIR3yMWSIjWWhHrIv6+xzAChrQ/pJKcgTljoIV 5+74N8fQVhbPQ5hp1x491zVbcJ2VJnWSHj+wBHrq/au5gEjWSyV9tdl+s5OZTRfO Od9kS66WNnFh9MwdISIxy7HBlz3/GpQWitX5eAOYx2AqTBZQRSCD301aNRM3xCaC MPVnIp80G/ojTuCoKbJzynXV9wSfQXbbGFtZ3yQvAX0e8SKIfgZL0SgIWpb9aeoh F0JfNquEWP38ZaU4IqsvAK1B0TmmxJ4Ux0kKpQk+HRpJx96EEx05V9KsJ9wAeMJT Rc27sDfv6LEW3ooC6l5ybLTuEIQNjQVpFT1p6QIDAQABAoIBAF4vS8+4g6DDWqbe mgddWKxcgFXvLqK1566leQZGG9aL6R+F8hY3knQ5WX0BBIZTHRwmGo2gybNgiVKf FiTWhvMixcyGXpEGJZ9RMQ3J6KYwBpqipahJIiZulxJDFABJYfLzLKrQPF+rv/3i uZznO7WSNYJMWoSGpGBP+b+apnv3EtId34XT2zYLQ+aGa3tcxXqHSd0zuodDMOO1 mc47g07WqMSaEpi+8Ii9FPkU0NyCDOHjFHVA4Cf04MTLblcgrCuL4uciBh3qQSf7 6Ryte8VIjt5DYidGfKoK6nVlBYDLar6me+S5uIYW2dw5r5O8Cg7Hp91FdcQc2Saa PKNMvO0CgYEA42HvJvk6dvbOhx7pJrM92IKNiiPTZq75UpSz2nuIcXoXif8bKio0 fmL5L1pgh7OdkHxziBcSY2dWHV+UrzrYFdLAngmGyO0VH1ZSqkOUA3a1Bqr65HEE MM3YjmIOEawOcZ9i0yrU9K2Pw8oSiFaHeXhNcexnMQ9wYX//HEkbV0cCgYEAyh5a OBHMwUt2a9tExyK9qTOwHJE7SyutwKtuyhzLoSVO8U1DfM71p3g0iZeQR4cUCld3 OHOx716hVXrMZot9Ln3PZs8DDUvPxqJeQpCVX6xGeJLBK2DXCOh0i916IGDMb+mS pbBawkL0LUIZyhPcwoCJBO6MH8t4ybm2rPPaLU8CgYEAz6MwxkA0uUnrkswRUHvB cCLXqVvJwizqFBUin9LK6AT71dIVNk3QHdG3hxxapdDJg5WB0rZu3kMRCkWr+tAb XuJTbn14jaah8Tncxwpq8TbHXE1qSo1BrGds56h2/IBHuE456mdkjAKqE7pFbibG E5Bd+DhOiyh0ETTW+zdvNiUCgYB6wpavaXhAitIBTmtmu94QL9mucDNgQ8ZDuJwQ 3A598MgS3Ye4/YbM0cCvNUQnfY6ZfWhm/DY9me9JmM0fF2fP3hAjdGZ5I+utzJ6N tX1UX7FpuFDlROs2eOGYtctgcQqainZMdmGZjcr61iQNzaSO6jzOpwiqow3ZEBg4 0d9ZFwKBgQDUcrfqS7zkd+xE3fCKq8kasqgfFkXQ/X8iyA07xa86IY0kOApBx5h2 ZBVWM9BnPHKaBAuwivGti4Pfo8kQ12+YymQyKks8QEQ/HP1FKlQGrUCkrv9lqku/ sZu3D4ZUta9j2pmqfJTuvZ8CKVa7giAGNl0SpKbLJqsK7Ln7MlB5tw== -----END RSA PRIVATE KEY-----

Create a new database "vittascience" and import the database from the [sql file] (https://app.slack.com/client/T51BTV197/GSSRRMJTZ) through Phpmyadmin (Login "root" mdp "" or other)

Make sure in your php.ini that upload_max_filesize, memory_limit and post_max_size are set higher than the database file's size

Go to namespace architecture to build metadata.json & db.json (for each namespace)

Follow the How to bypasss guide to have an effective account on localhost. contact@vittascience.com is an admin account, you can do the same with a normal or a teacher acccount if needed.

Translation
As for now, the language system does not work on localhost. To change the language, the language cookie should be changed by hand : application -> Cookie -> http://vittascience/ -> lng

Gulp
Gulp is a toolkit to enhance our workflow and allow us to have a better website for production. With Gulp, we concat and compress our JS / CSS files for example.

You must have Gulp install on your computer.

Download NodeJS LTS version. If you have Linux OS, you should use your packets manager. (check this ressources : https://nodejs.org/en/download/package-manager/)

Go to your terminal and type this command (You might need root permissions | sudo):

npm install --global gulp-cli

Then, type this command in your terminal :
gulp -v

if you see something like this :

CLI version: 2.2.0 Local version: Unknown You should be good.

Now, go to vittascience git repository you clone earlier using terminal. (use cd command to navigate) From this folder, type this command (You might need root permissions | sudo):
npm install

Finally, you can try our configuration files for Gulp :
sudo gulp (gulp on windows)

This command will read gulpfile.js and read all our configuration files in gulp folder to process our files. After execution, you should have a new folder in vittascience repository : prod

prod is the overlay with all minified files and modifications. You must always use Gulp and upload the content of prod when you want to put the website in production.

Gulp process works differently with Windows and Mac/Linux. Do it with the latter to avoid conflicts.

Get familiar with git
^^^^^^^^^^^^^^^^^^^^^

If you are contributing to the project, you should be very familiar with git. We highly recommend you to create a mini project on your own and try every set of commands in the sections of this guide.

Add, commit and push
The simplest contribution to a repository's master branch can be done using these three commands

git add file1 file2 file3 #add files you have modified - track them
git commit -m "write here a significant message that documents well your change" #commit your change
git push
Note: please avoid using git add *

If you run these command while being on Vittascience master branch, you'll get this:

error: You are not allowed to push code to protected branches on this project.

It is important to know that you should not work on the master branch since it is protected from direct pushes through branch rules. Branch rules force developers to issue merge requests to be validated by project maintainers before integrating them into main code. You, as a developer, need to work on your own branch or your team's branch then open a pull request (PR) to merge with master.

Project owners/maintainers: rules for the branches can be set here.

Create and push a branch
git checkout -b your_branch_name #create branch
git merge master #optional since new branches are created directly from master branch
git push
First push: git push -u origin your_branch_name #push your local branch to remote repository

Merge others' work into your branch
Sometimes a team different than yours push to master their changes, you should merge their changes into your branch so you avoid conflicts.

git checkout their_branch_name #go to their branch
git pull #update their local branch
git checkout your_branch_name #go to your branch
git merge another_team_branch
git push
Pull request - Merge with develop
It is worth noting that git request-pull is different from open new pull request on Github. We use Github website for new PR.

Note: Compare: your_branch_name and Base: develop

Example Pull Request

Don't forget to:

Comment well your pull request
Assign a reviewer
Label your pull request
The following points must be respected :

A pull request should have a clear, technical and easy to understand description of the work done:
What this PR do?
What's the motivation?
Any additional Notes
A pull request should pass all checks: Continuous Integration and conflicting files.
A pull request's description should contain all the tested cases/scenarios for the new feature or the fixes it carries.
In case a pull request carries non working code, a diagnosis of the bug should be written within the description.
Push to production
Developers and Teams are asked to push to develop branch, that is the most advanced stable branch of the project. Once develop branch is well tested and stable, she should be pushed to master branch.

The master branch reflects the current state of the website in production, so the master branch should be pushed to production with FTP (FileZilla or other). Be careful, the .htaccess, sitemap.xml, db.json and private/db_config.php files are different from master to production, and shouldn't be pushed.

Stash your changes
If you are trying to pull changes from remote branch and this pops out "Please, commit your changes or stash them before you can merge."

Obviously this can be solved by running git commit -m "any message". But what if you don't really like to commit before these changes before pulling? This is where git stash comes handy.

When you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the HEAD commit.

To save your current state

git stash

To apply back these changes

git stash pop

.gitignore
Git sees every file in your working copy as one of three things:

tracked - a file which has been previously staged or committed;
untracked - a file which has not been staged or committed; or
ignored - a file which Git has been explicitly told to ignore.
What folders should be ignored?

IDE files such as .idea and .vscode.
Log files .log.
Compiled source .class, .dll, .exe, .o, .so, etc...
private/ since it is relative to every developer.
How to tell git ignore a file or a folder?

Append the folder to be ignored to the end of .gitignore using echo "folder_to_ignore/" >> .gitignore or any text editor of your choice.

.gitkeep
Sometimes instead of telling git to explicitly ignore a folder, you are interested to explicitly tell git to keep a folder. This comes handy when you are trying to track empty folders.

Empty directories are not content. Thus, ignored by git.

People who want to track empty directories in Git have created the convention of putting files called .gitkeep in these directories. The file could be called anything; Git assigns no special significance to this name.

cd folder_to_keep
touch .gitkeep

*Useful links:*
    https://help.github.com/en/articles/adding-a-file-to-a-repository-using-the-command-line

    https://git-scm.com/book/en/v1/Git-Branching-What-a-Branch-Is

    https://help.github.com/en/articles/creating-a-pull-request-from-a-fork

    https://confluence.atlassian.com/bitbucket/branching-a-repository-223217999.html

    https://www.atlassian.com/git/tutorials/saving-changes/gitignore

Git Workflow
^^^^^^^^^^^^

-Create a new branch for each project

-Give clear title for important commits

-If two developpers work on the same project, communicate a lot and don't erase each other job

-Don't push your work online unless you got permission and are sure it won't break anything

-When your project is ready, make a pull request to develop branch