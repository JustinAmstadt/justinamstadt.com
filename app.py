import os
from flask import Flask, jsonify, send_from_directory, request, json
from zokrates.zokrates import computeWitnessProof

app = Flask(__name__)

@app.route('/zk')
def serve_html():
    return send_from_directory('.', 'zk.html')

@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('assets', path)

@app.route('/images/<path:path>')
def serve_images(path):
    return send_from_directory('images', path)

@app.route('/zk', methods=['POST'])
def submit_data():
    if request.method == 'POST':
        data = request.json  # Assuming the data is sent as JSON
        a = 0
        b = 0
        try:
            a = int(data['a'])
            b = int(data['b'])
            print(b)
        except:
            return jsonify({'message': 'Please enter integers only'})
        if not 0 <= a <= 10_000_000_000:
            return jsonify({'message': 'Variable A must be between 0 and 10,000,000,000'})
        if not 0 <= b <= 10_000_000_000:
            return jsonify({'message': 'Variable B must be between 0 and 10,000,000,000'})

        zokratesDir = "zokrates"
        proofFile = f"{zokratesDir}/proof.json"
        computeWitnessProof(a, b, zokratesDir)

        if os.path.exists(proofFile):
            with open(proofFile, 'r') as f:
                data = json.load(f)
            data['message'] = 'Data received successfully'
            return jsonify(data)
        else:
            return jsonify({'message': 'Data received successfully', 'output': str(a) + ' is not the square root of ' + str(b)})

    else:
        return jsonify({'error': 'Only POST requests are allowed'})

if __name__ == '__main__':
    app.run()