import json
import os, subprocess
from django.http import JsonResponse

def computeWitnessProof(a: int, b: int, cwd: str = "") -> None:
    old_proof_path = f"{cwd}/proof.json"
    if os.path.exists(old_proof_path):
        os.remove(old_proof_path)

    bash_command = f"/home/justin/.zokrates/bin/zokrates compute-witness -a {a} {b}"

    try:
        output = subprocess.check_output(bash_command, shell=True, text=True, cwd=cwd)
    except subprocess.CalledProcessError as e:
        print("Error executing the command:", e)
        return

    bash_command = "/home/justin/.zokrates/bin/zokrates generate-proof"

    try:
        output = subprocess.check_output(bash_command, shell=True, text=True, cwd=cwd)
    except subprocess.CalledProcessError as e:
        print("Error executing the command:", e)

def submit_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        a = 0
        b = 0
        try:
            a = int(data.get('a', 0))
            b = int(data.get('b', 0))
        except ValueError:
            return JsonResponse({'message': 'Please enter integers only'}, status=400)
        
        if not 0 <= a <= 10_000_000_000:
            return JsonResponse({'message': 'Variable A must be between 0 and 10,000,000,000'}, status=400)
        if not 0 <= b <= 10_000_000_000:
            return JsonResponse({'message': 'Variable B must be between 0 and 10,000,000,000'}, status=400)

        zokrates_dir = "zk"
        proof_file = os.path.join(zokrates_dir, "proof.json")
        computeWitnessProof(a, b, zokrates_dir)

        if os.path.exists(proof_file):
            with open(proof_file, 'r') as f:
                data = json.load(f)
            data['message'] = 'Data received successfully'
            return JsonResponse(data)
        else:
            return JsonResponse({'message': 'Data received successfully', 'output': f"{a} is not the square root of {b}"})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
