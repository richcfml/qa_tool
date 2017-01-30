Process = function(){

    function get_form_elements(){
        var headers = {};
        var payload = {};
        var frm = document.getElementById('api_calls');
        //console.log(frm);
        for(var i = 0; i < frm.elements.length;i++){
            //get each element
            var r = frm.elements[i];
            if( r.hasAttribute("data-gateway-header-field") ){
                headers[r.name] = r.value;
            }
            if( r.getAttribute("data-gateway-field") ){
                payload[r.name] = r.value;
            }
        }

        return {
            headers: headers,
            payload: payload
        };
    }//end of form_elements

    /*
    Create headers for transaction
  */
  function create_headers(elements, endpoint_url, data){
    //set vars
    var gateway_id  = elements.gateway_id;
    var password    = elements.password;
    var key_id      = elements.key_id;
    var hmac_key    = elements.hmac_key;
    var myJsonString = data;
    
    //console.log(gateway_id);
    //console.log(password);
    //console.log(key_id);
    //console.log(hmac_key);
    //console.log(endpoint_url);
    console.log('The payload passed to the function is ' + myJsonString);

    var hashTime = new Date().toISOString();
    var contentHash = CryptoJS.SHA1(myJsonString).toString(CryptoJS.enc.Hex);
    var parts = endpoint_url.split('/');
    var path = "/" + parts[3] + "/" + parts[4];
    //console.log('The path is: ' + path);
    //console.log('The contentHash is: ' + contentHash);

    //var authString = "POST" + "\n" + "Content-Type" + "\n" + contentHash + "\n" + hashTime + "\n"+ path;
    var authString = "POST" + "\n" + "application/json" + "\n" + contentHash + "\n" + hashTime + "\n"+ path;    
    var authHmac = CryptoJS.HmacSHA1(authString, hmac_key).toString(CryptoJS.enc.Base64);
    var authHeader = "GGE4_API " + key_id + ":" + authHmac;

    var gge4_date =  hashTime;
    var gge4_content_sha1 = contentHash;
    var authorization = authHeader;
    console.log('The HMAC is: ' + authHmac);
    console.log('The Date is ' + gge4_date);
    console.log('The content hash is ' + gge4_content_sha1);
    console.log('The authorization is ' + authorization);
    
    return {
        gge4_date: gge4_date, 
        gge4_content_sha1: gge4_content_sha1, 
        authorization: authorization
    };
    

  }//end of create headers

    var form_elements = get_form_elements();
    var endpoint_url = form_elements.headers.url_field;
    var headers = create_headers(form_elements.headers, endpoint_url, JSON.stringify(form_elements.payload));
    var method = "POST";
    var data = JSON.stringify(form_elements.payload);
      
    xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint_url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-gge4-date", headers.gge4_date);
    xhr.setRequestHeader("x-gge4-content-sha1",headers.gge4_content_sha1);
    xhr.setRequestHeader("Authorization",headers.authorization);   
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json.amount + ", " + json.password);
        }
    };
    //var data = JSON.stringify({"email":"hey@mail.com","password":"101010"});
    console.log('The data sent is: ' + data);
    //console.log(form_elements.headers)
    xhr.send();
    //console.log(get_form_elements());
}