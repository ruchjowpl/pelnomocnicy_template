var http = require('http');
var jsreport = require('jsreport');
var fs = require('fs');

var request = require('request'),
    username = "john",
    password = "1234",
    url = "https://pelnomocnicy.apispark.net/v1/pelnomocnicies?$size=1000";
//https://037fc8c9-9375-46e5-a209-e19808257c38:0a3910ad-8070-4f55-8a88-6004bf507d9c" + 

http.createServer(function (req, res) {
  
  console.log(req.url);
  request(
    {
        url : url
    },
    function (error, response, body) {
          console.log(JSON.parse(body).length);
          var contents = fs.readFileSync('template.html', 'utf8');
          jsreport.render({
          	 template: {
 			  content:contents,
  			  engine: "handlebars"
			},
			data: {people: JSON.parse(body)}
		}).then(function(out) {
	      out.stream.pipe(res);
          }).catch(function(e) {    
  		  res.end(e.message);
  	});

    }
);


}).listen(1337, '127.0.0.1');