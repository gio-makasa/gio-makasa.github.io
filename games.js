var mydata = JSON.parse(quote);
var R = Math.floor(Math.random()*mydata.length);

app.controller('quotes', function($scope) {
  $scope.q = `"${mydata[R].q}"`;
  $scope.a = `- ${mydata[R].a}`;
});