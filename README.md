<html>
<body>
	<h1>Backlog</h1>
	<h4>Security</h4>
	<ul>
		<li>setup certificate based mutual TLS connection between client and server</li>
		<li>introduce WebService security</li>
		<li>remove CORS filter and replace it with proxy between front-end and backend servers</li>
	</ul>
	<h4>Update/Add child feature</h4>
	<ul>
		<li>rethink error handling of saving child (unsaved data should not be lost by displaying error message due to a failure)</li>
		<li>discard changes on child detail form</li>
		<li>animation for saving changes</li>
		<li>warning for unsaved changes on navgition away from child detail form</li>
		<li>confirm user the successful adding/saving</li>
	</ul>
	<h4>Delete child feature</h4>
	<ul>
		<li>confirm user the successful deletion</li>
	</ul>
	<h4>Tehnical debt / Technical improvement</h4>
	<ul>
		<li>use Lombok to manage boiler plate code for POJOs</li>
		<li>introduce index.ts for each module and reorganize javascript imports</li>
		<li>reorganize routes in web module to have them defined only once</li>
		<li>move utility module into shared</li>
		<li>remove area... html attributes</li>
		<li>remove package default Child constructor and mandatory fields setter and replace them with JsonCreator and JsonProperty</li>
	</ul>
	<h4>Audit / Logging</h4>
	<ul>
		<li>@CreatedDate @LastModfiedDate auditing</li>
		<li>@CreatedBy @LastModfiedBy auditing</li>
		<li>introduce application logging (SL4J)</li>
	</ul>
	<h4>Devops (Build / Deployment / Testing)</h4>
	<ul>
		<li>introduce static code quality checker for java (like: checkstyle)</li>
		<li>suppress spring boot/web log during build process</li>
		<li>use wiremock for api mocking instead of ng-api-mock</li>
		<li>capture and check somehow "void" requests sent by web to back-end during e2e testing</li>
		<li>remove compileComponents and async call from component tests</li>		
		<li>introduce CommonTestSteps + given/when/then in ui tests</li>
		<li>move test-utils stubs to their production object</li>
		<li>introduce default objects for web mocks</li>
		<li>Page (objects) in web unit tests</li>
	</ul>
</body>
</html>
