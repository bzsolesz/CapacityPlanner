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
		<li>warning for unsaved changes on navigation away from child detail form</li>
		<li>confirm user the successful adding/saving</li>
	</ul>
	<h4>Delete child feature</h4>
	<ul>
		<li>confirm user the successful deletion</li>
	</ul>
	<h4>Display weekly attendance feature</h4>
	<ul>
		<li>Web unit and e2e tests</li>
	</ul>
	<h4>Edit attendance</h4>
	<ul>
		<li>frontend validation for daily attendance (if one if undefined than both have to be, 'to' cannot less than or equal to 'from')</li>
	</ul>
	<h4>Technical debt / Technical improvement</h4>
	<ul>
		<li>use Lombok to manage boiler plate code for POJOs</li>
		<li>reorganize routes in web module to have them defined only once</li>
		<li>remove package default Child constructor and mandatory fields setter and replace them with JsonCreator and JsonProperty</li>
		<li>rename e2e/page_objects to e2e/pages</li>
		<li>rename e2e/mock_backend to e2e/backend-mocks</li>
		<li>refactor *.po.ts to .page.ts</li>
		<li>introduce browser.page.ts for all browser.* calls</li>
	</ul>
	<h4>Audit / Logging</h4>
	<ul>
		<li>@CreatedDate @LastModfiedDate auditing</li>
		<li>@CreatedBy @LastModfiedBy auditing</li>
		<li>introduce application logging (SL4J)</li>
	</ul>
	<h4>DevOps (Build / Deployment / Testing)</h4>
	<ul>
		<li>introduce static code quality checker for java (like: checkstyle)</li>
		<li>use Wiremock for api mocking instead of ng-apimock</li>
		<li>capture and check somehow "void" requests sent by web to back-end during e2e testing</li>
		<li>introduce CommonTestSteps + given/when/then in ui tests</li>
		<li>introduce default objects for web mocks</li>
		<li>page (objects) in web unit tests</li>
		<li>real e2e tests from database (rebuilt and reloaded), through tge backend (rebuild and redeployed) to web (rebuild and redeployed)</li>
	</ul>
	<h4>New features</h4>
	<ul>
	    <li>start date for child</li>
	    <li>vacation for child to update their attendance for short periods</li>
	    <li>below/under one year on weekly attendance chart</li>
	    <li>google calendar integration for child attendance</li>
	</ul>
	<h4>Defects</h4>
	<ul>
		<li>child name in candlestick chart is not picked up if the child does't attend on the busiest day</li>
		<li>running the e2e test produces some errors in the html report for add children feature</li>
	</ul>	
</body>
</html>
