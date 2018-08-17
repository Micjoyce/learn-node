const request = require('request')
const util = require('util')


request('http://192.168.0.25:31090/v1/consumers:search', {
        'method': 'GET',
    },
    function (error, response, body) {
        console.log(error);

        if (error || response.statusCode != 200) {

            result = (error) ? util.inspect(error) : response.statusCode;
            console.log('FAILED.\n');
            console.log(result);
            console.log('----------------------------');
            return
        }

        if (response.body) result = response.body;
        else result = '';
        console.log('SUCCESS.\n');
        console.log(result);
        console.log('----------------------------');

    });