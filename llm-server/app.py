from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/llm', methods=['POST'])
def llm_echo():
    data = request.json
    return jsonify({"echo": data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 