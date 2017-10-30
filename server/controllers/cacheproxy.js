const https = require('https');
var querystring = require('querystring');
const IPdata = require('../models/ipdata');
const config = require('../config');

exports.cacheIp = function(req,res,next){
    //debugger;
    const ip = req.query.i;
    const Url = config.ipcache.url;
    
    //Check the request parameter whether quer parameter name ip  exists, if not return error message
    if (!ip){
      return res.status(422).send({error:'Please provide ip in query parameter.'});
    }
    //Check the ip in database
    IPdata.findOne({ip: ip}, function(err, ipExists){
        if (err){return next(err); }

        //ip exists in the database return it
        if (ipExists){
          return  res.send(ipExists.ipdata);
        }
        else{

            //ip does not exists in our dabase call mm service and store the result in our database.
            const getdata = {"l":  config.ipcache.maxmindkey,  i: ip};
           // const queryString =   querystring.stringify('/b' + querystring);
            performRequest(Url, '/b', 'GET', getdata, res,next ); 

        }

    })
     

     
     
}

// The function to save the changes in mongo database.
function success(responseString,ip, res,next) {
  
  const IpInfo = new IPdata({
    ip: ip.toString(),
    ipdata: responseString.toString()
});

IpInfo.save(function(err){
    if(err){ return next(err);
      console.log(err);        
    }
});
  res.send(responseString);
}
//Call other web service and return the results.
function performRequest(host, endpoint, method, data, res,next) {
    var dataString = JSON.stringify(data);
    var headers = {};
    
    if (method == 'GET') {
      endpoint += '?' + querystring.stringify(data);
    }
    else {
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
      };
    }
    var options = {
      host: host,
      path: endpoint,
      method: method,
      headers: headers
    };
    console.log(options);
    var req = https.request(options, function(mmresp) {
        mmresp.setEncoding('utf-8');
  
      var responseString = '';
  
      mmresp.on('data', function(data) {
        responseString += data;
      });
  
      mmresp.on('end', function() {
        console.log(responseString.toString());
        //var responseObject = JSON.parse(responseString);
        //success(responseObject);
            // const data = (json);
            console.log(data.i.toString());
           
            success(responseString, data.i, res, next);   


      });
    });
  
    req.write(dataString);
    req.end();
  }

  
