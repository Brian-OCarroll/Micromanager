
const stockURL = 'https://www.alphavantage.co/query';
const symbolURL = 'https://api.iextrading.com/1.0/ref-data/symbols';
const key = 'LU1ASZD46LS2Y4V8';
//setup an object that holds a query parameter and then a reference for
//the returned json object
const stockDay = {json: 'Time Series (Daily)', path: 'TIME_SERIES_DAILY'};

//change key
function fixKeys(obj){
	Object.keys(obj).forEach(function(key){
        let newKey = key.split('.')[1].trim();
        //dynamic form of obj.newKey
		obj[newKey] = obj[key];
		delete obj[key];
	});
	return obj;
}

function stocksAPI(searchTerm, callback) {
    const query = {
    url: stockURL,
    data: {
        symbol: searchTerm,
        function: stockDay.path,
        apikey: key,
        outputsize: 'full'
    },
    dataType: 'json',
    type: 'GET',
    success: stocksCallBack,
    error: console.log('error')
    }
$.ajax(query)
}
function stocksCallback(data) {
    //the main object with all dates by day
    let fullData = data[stockDay.json];
    let arrayData = [];
// adds a key value pair for the date, with the date of the stock quote, 
//and then deletes the key 'Time Series (Daily)'
Object.keys(fullData).map(function (key) {
    let obj = {};
    obj = fixKeys(fullData[key]);
    obj['date'] = key;
    arrayData.push(obj);
});
//current days data
let todayData = arrayData[0];
//get 52 week high/low
let arrayLow = [];
let arrayHigh = [];
for (let i = 0; i < 365 && i < arrayData.length; i++) {
    arrayLow.push(parseInt(arrayData[i].low));
    arrayHigh.push(parseInt(arrayData[i].high));
}
todayData['tlow'] = Math.min.apply(null, arrayLow);
todayData['thigh'] = Math.max.apply(null, arrayLow);
}

