document.getElementById('zkform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    var formData = new FormData(this);
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    fetch('/zk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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