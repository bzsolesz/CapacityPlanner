#copy this file to $TOMCAT_HOME/bin to activate local spring profile and point to local configuration directory
export CATALINA_OPTS="$CATALINA_OPTS -Dspring.profiles.active=local -Dspring.config.location=${LOCAL_DEPLOYMENT_CONFIG_DIRECTORY}/"
