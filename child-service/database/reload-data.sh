read -s -p "Password:" password
$LIQUIBASE_HOME/liquibase --classpath=$MYSQL_CONNECTOR_JAR --password=$password --changeLogFile=child-db-testdata-changelog-master.xml update