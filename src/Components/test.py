import sys
import json
import requests

url = 'http://localhost:5000/twitter/followers?user_id=1623840974'

r = requests.get(url)
data = r.json()

print('PYTHON REQUEST')

resp = {
    "Message": "Hello from python",
    "Data": data
}

for i in range(len(resp["Data"])):
    print(json.dumps(resp["Data"][i]["id"]))

sys.stdout.flush()
