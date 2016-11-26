//Socket.io with HTTP server, emitting data received from Arduino to the WebApp

var ThingSpeakClient = require('thingspeakclient');
var express = require('express');
var app = express();
var http = require('http');
var httpserver = http.createServer(app);
var io = require('socket.io').listen(httpserver);
var fs = require('fs');
var bodyParser = require('body-parser'); //nodejs module used to parse the body of a HTTP POST request into JSON data format
var methodOverride = require('method-override');
var portName = 'COM4';

var SerialPort = require('serialport').SerialPort;


var appConfig = {
	    staticPath:  __dirname // __dirname+'/static'
	};

app.use(express.static(appConfig.staticPath));
app.use(bodyParser.urlencoded({'extended':'true'})); //configure Express app to use the body parser
app.use(bodyParser.json());
app.use(methodOverride());
app.get('/', function(request, response){
	response.sendFile('./index.html');
});

//ThingSpeak
var client = new ThingSpeakClient({server:'https://api.thingspeak.com'},{useTimeoutMode:false});
client.attachChannel(121681, { writeKey:'', readKey:''});//set your writeKey and readKey

//HTTP server listener
httpserver.listen(8080, function(){
	console.log('Socket.io Server listening on port 8080.');
	
	/*http.get('http://api.thingspeak.com/channels/121681/fields/1/last.json', function(res) {
		res.on('data', function (chunk) {
			var json = JSON.parse(chunk);
				
			console.log('JSON value: ', json["field1"]);
			io.sockets.emit('data', "300");
	  
		//console.log('BODY: ' + json["field1"]);
		});
		res.on('error', function(error) {
			console.error("errore");
		});
	});*/
});

io.sockets.on('connection', function(socket){
	console.log('Socket.IO socket is connecting.');
	
		/*http.get('http://api.thingspeak.com/channels/121681/fields/1/last.json', function(res) {
			res.on('data', function (chunk) {
				var json = JSON.parse(chunk);
					
				console.log('JSON value: ', json["field1"]);
				io.sockets.emit('data', json["field1"]);
		  
			//console.log('BODY: ' + json["field1"]);
			});
			res.on('error', function(error) {
				console.error("errore");
			});
		});		
	*/
});


var sp = new SerialPort(
portName, {
   baudRate: 115200, 
   dataBits: 8, 
   parity: 'none', 
   stopBits: 1, 
   flowControl: false 
});















sp.on('data', function (data) { 
    dato_letto = data.toString();
	var res = dato_letto.split(" ");
	client.updateChannel(121681, {field1 : res[0],field2: res[1],field3: res[2],field4: res[3],field5: res[4], field6: res[5], field7: res[6], field8: res[7]});
    
			io.sockets.emit('messaggio', 1);
	
	//console.log(res[0]);
	//res [0] temperatura
	//res [1] umidità
	//res [2] accelazione X
	//res [3] accelazione Y
	//res [4] accelazione Z
	//res [5] giroscopio X
	//res [6] giroscopio Y
	//res [7] giroscopio Z
	//res [8] pressione
	
	//console.log("TEMPERATURA: " +res [0] +"\n"+ "UMIDITA:"+res[1]);
	http.get('http://api.thingspeak.com/channels/121681/fields/1/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('temp', json["field1"]);
	console.log(json["field1"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});

//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/2/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('umid', json["field2"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});


//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/3/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('accX', json["field3"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});
//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/4/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('accY', json["field4"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});


//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/5/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('accZ', json["field5"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});
//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/6/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('girX', json["field6"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});


//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/7/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('girY', json["field7"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});

//--------------------------------------------------------------------------------------------
	http.get('http://api.thingspeak.com/channels/121681/fields/8/last.json', function(res) {
    res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    io.sockets.emit('girZ', json["field8"]);
  });
  res.on('error', function(error) {
    console.error("errore");
  });
});














































































	//client.updateChannel(121681, {temperature : res[0],humidity: res[1],accelX: res[2],accelY: res[3],accelZ: res[4], girX: res[5], girY: res[6], girZ: res[7]});



	});