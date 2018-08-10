# 3APAdmin Backend

This is the backend, coded with Spring Boot 2.


## Developers

Formatting style is in eclipse_formatter.xml -> open to feedback

Import order in eclipse.importorder

### Intellij setup

* git clone 
* import Project -> Maven
* File -> New -> Module from existing sources -> Create module from existing sources
* Let Idea run yarn install
* Import formatter and import order with eclipse formatter plugin (see https://github.com/3AP-AG/harvest-client/wiki/Developers)

### Database Setup

* Install MariaDB 

`brew install mariadb` it may happen that you are getting an error after running this command. It is due to default 3ap setup that installs mysql with brew (https://github.com/3AP-AG/dotfiles/blob/master/roles/apps/tasks/main.yml#L28). You should unlink mysql before continuing with next steps `brew unlink mysql`
`mysql.server start`
`brew services start mariadb`

The service will run on 3306 port 

* Download DBeaver/SQuirreL -> Create database '3apadmindb' -> Make user '3apadmin' with no password

 