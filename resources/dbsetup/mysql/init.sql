-- Create user and grant permissions
CREATE USER 'FOO'@'%' IDENTIFIED BY 'BAR';
GRANT ALL PRIVILEGES ON *.* TO 'FOO'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Load data from backup file
SOURCE /docker-entrypoint-initdb.d/employees-backup-initial.sql;