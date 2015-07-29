var http = require('http');
var jsreport = require('jsreport');
var fs = require('fs');
var urler = require('url');
var request = require('request');
//https://037fc8c9-9375-46e5-a209-e19808257c38:0a3910ad-8070-4f55-8a88-6004bf507d9c" + 

var port = Number(process.env.PORT || 8888);

http.createServer(function (req, res) {
var params = urler.parse(req.url, true).query;
var template = (params.inst == "obywatele") ? "templateObywatele.html" :"templateJOW.html";
var url = ((params.file ==  "old") ? "https://pelnomocnicy.apispark.net/v1/pelnomocnicies?$size=1000" : "https://pelnomocnicy.apispark.net/v1/pelnomocnicies?$size=1000");
  request(
    {
        url : url
    },
    function (error, response, body) {
          console.log(JSON.parse(body).length);
          var contents = fs.readFileSync(template, 'utf8');
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


}).listen(port);