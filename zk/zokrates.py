import subprocess, sys, os

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

if __name__ == "__main__":
    computeWitnessProof(1, 1)
