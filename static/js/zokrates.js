function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Check if the cookie name matches the CSRF cookie name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.getElementById('zkform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    var csrfToken = getCookie('csrftoken')
    var formData = new FormData(this);
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    fetch('compute/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let outputString;
        if (data.hasOwnProperty("proof")){
            let a = "<br>" + data.proof.a[0] + "<br>" + data.proof.a[1] 
            let b = "<br>[" + data.proof.b[0][0] + ",<br>" + data.proof.b[0][1] + "],<br>[" + data.proof.b[1][0] + ",<br>" + data.proof.b[1][1] + "]"
            let c = "<br>" + data.proof.c[0] + "<br>" + data.proof.c[1] 
            outputString = `Curve: ${data.curve}<br>Inputs: ${data.inputs}<br>Scheme: ${data.scheme}<br>Proof:<br>a: ${a}<br>b: ${b}<br>c: ${c}`
        } else if (data.message === "Data received successfully") {
            outputString = data.output
        } else {
            outputString = data.message
        }

        document.getElementById('zk-output').innerHTML = outputString
        document.getElementById('zk-output').style.whiteSpace = 'pre-wrap'; // Preserve newline characters
    })
    .catch(error => {
        console.error('Error:', error);
    });
});