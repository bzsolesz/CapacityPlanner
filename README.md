# CapacityPlanner
Stories to come:
- Introduce WebService security
- Setup certificate based mutual TLS connection between client and server
- try out Lombok to manage boiler plate code for POJOs
- @CreatedDate @LastModfiedDate auditing
- @CreatedBy @LastModfiedBy auditing
- introduce application logging
- introduce static code quality checker for java (like: checkstyle)
- introduce index.ts for each module and reorganize javascript imports
- remove CORS filter and replace it with proxy between front-end and backend servers
- reorganize routes in web module to have them defined only once

- rethink error handling of saving child (unsaved data should not be lost by displaying error message due to a failure)
- discard changes on child detail form
- animation for saving changes
- warning for unsaved changes on navgition away from child detail form
- introduce steps and given/when/then in ui tests
- capture and check somehow "void" requests sent by web to back-end during e2e testing
- suppress spring boot/web log during build process
