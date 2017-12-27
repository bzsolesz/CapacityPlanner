const express = require('express');
const ngApimock = require('ng-apimock')();
const app = express();

ngApimock.run({
   "src": "mocks",
   "outputDir": "target",
   "done": function() {}
});

app.set('port', (process.env.PORT || 3000));
app.use(require('ng-apimock/lib/utils').ngApimockRequest);

app.listen(app.get('port'), function() {
 console.log('app running on port', app.get('port'));
});