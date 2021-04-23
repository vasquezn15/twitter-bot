import sys
import json
import requests
import urllib.request
url = 'http://localhost:5000/twitter/followers'
req = urllib.request.Request()
req.set_proxy('PROXY_HOST:PROXY_PORT', 'http')  # <---
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode())  # <----
print(data)
# url = 'http://localhost:5000/bot/followers'

# r = requests.get(url)
# r.set_proxy('PROXY_HOST:PROXY_PORT', 'http')

# data = r.json()

# print('PYTHON REQUEST')

# resp = {
#     "Message": "Hello from python",
#     "Data": data
# }
# print('r from python request' + r)
# print(json.dumps(resp["Data"][i]["id"]))
# # for i in range(len(resp["Data"])):
# #     print(json.dumps(resp["Data"][i]["id"]))

# sys.stdout.flush()
