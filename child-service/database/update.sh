read -s -p "Password:" password
$LIQUIBASE_HOME/liquibase --classpath=$MYSQL_CONNECTOR_JAR --password=$password --changeLogFile=child-db-changelog-master.xml update