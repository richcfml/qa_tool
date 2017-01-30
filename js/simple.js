Process = function(){
	//variables with form content
	const apiurl = document.querySelector('#url_field').value;
	const gateway_id = document.querySelector('#gateway_id').value;
	const hmac_key = document.querySelector('#hmac_key').value;
	const password = document.querySelector('#password').value;
	const key_id = document.querySelector('#key_id').value;
	const payload = document.querySelector('#payload').value;

	//const final_payload = JSON.stringify(payload);
	
	//get the path
	const trans_path = '/' + apiurl.split('/')[3] + '/' + apiurl.split('/')[4]

	var hashTime = new Date().toISOString();
	//var contentHash = CryptoJS.SHA1(final_payload).toString(CryptoJS.enc.Hex);
	var contentHash = CryptoJS.SHA1(payload).toString(CryptoJS.enc.Hex);

	var authString = "POST" + "\n" + "application/json" + "\n" + contentHash + "\n" + hashTime + "\n"+ trans_path;    
    var authHmac = CryptoJS.HmacSHA1(authString, hmac_key).toString(CryptoJS.enc.Base64);
    var authHeader = "GGE4_API " + key_id + ":" + authHmac;

    xhr = new XMLHttpRequest();
    xhr.open("POST", apiurl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "X-Custom-Header");
    xhr.setRequestHeader("x-gge4-date", hashTime);
    xhr.setRequestHeader("x-gge4-content-sha1",contentHash);
    xhr.setRequestHeader("Authorization",authHeader);   
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json.amount + ", " + json.password);
        }
    };
    xhr.send(payload);

	console.log(apiurl);
	console.log(gateway_id);
	console.log(hmac_key);
	console.log(password);
	console.log(key_id);
	console.log(payload);
	//console.log(final_payload);
	console.log(trans_path);
	console.log(hashTime);
	console.log(contentHash);
	console.log(authString);
	console.log(authHmac);
	console.log(authHeader);


}