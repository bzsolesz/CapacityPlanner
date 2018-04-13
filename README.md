<html>
<body>
	<h1>Backlog</h1>
	<h4>Security</h4>
	<ul>
		<li>setup certificate based mutual TLS connection between client and server</li>
		<li>introduce WebService security</li>
		<li>remove CORS filter and replace it with proxy between front-end and backend servers</li>
	</ul>
	<h4>Child list feature</h4>
	<ul>
		<li>css for child list page</li>
	</ul>
	<h4>Update child feature</h4>
	<ul>
		<li>rethink error handling of saving child (unsaved data should not be lost by displaying error message due to a failure)</li>
		<li>discard changes on child detail form</li>
		<li>animation for saving changes</li>
		<li>warning for unsaved changes on navgition away from child detail form</li>
		<li>css for children button</li>
	</ul>
	<h4>Tehnical debt / Technical improvement</h4>
	<ul>
		<li>try out Lombok to manage boiler plate code for POJOs</li>
		<li>introduce index.ts for each module and reorganize javascript imports</li>
		<li>reorganize routes in web module to have them defined only once</li>
	</ul>
	<h4>Audit / Logging</h4>
	<ul>
		<li>@CreatedDate @LastModfiedDate auditing</li>
		<li>@CreatedBy @LastModfiedBy auditing</li>
		<li>introduce application logging</li>
	</ul>
	<h4>Devops (Build / Deployment / Testing)</h4>
	<ul>
		<li>introduce static code quality checker for java (like: checkstyle)</li>
		<li>suppress spring boot/web log during build process</li>
		<li>capture and check somehow "void" requests sent by web to back-end during e2e testing</li>
		<li>introduce steps and given/when/then in ui tests</li>
	</ul>
</body>
</html>