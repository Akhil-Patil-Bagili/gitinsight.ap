from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import openai
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import fitz  # PyMuPDF
from astra import init_astra_db



app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running!"})

@app.route('/astra_test', methods=['GET'])
def astra_test():
    collections = get_collections()
    return jsonify({"AstraDB Collections": collections})


def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text



def get_astra_session():
    cloud_config= {
        'secure_connect_bundle': 'path/to/your/secure-connect-database.zip'
    }
    auth_provider = PlainTextAuthProvider('clientId', 'clientSecret')
    cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
    session = cluster.connect()
    return session


def fetch_and_refine_commits(username, repo_name):
    url = f"https://api.github.com/repos/{username}/{repo_name}/commits"
    response = requests.get(url)
    refined_commits = []
    for commit in response.json():
        refined_commit = {
            "sha": commit["sha"],
            "author": commit["commit"]["author"]["name"],
            "date": commit["commit"]["author"]["date"],
            "message": commit["commit"]["message"],
            # Add more fields as needed
        }
        refined_commits.append(refined_commit)
    return refined_commits


@app.route('/get_commits', methods=['POST'])
def get_commits():
    data = request.json
    username = data['username']
    repo_name = data['repo_name']
    commits = fetch_and_refine_commits(username, repo_name)
    return jsonify(commits)


def generate_response(query, api_key):
    openai.api_key = api_key
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=query,
        temperature=0.5,
        max_tokens=100,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )    
    return response.choices[0].text.strip()

@app.route('/store_commits', methods=['POST'])
def store_commits():
    data = request.json
    username = data['username']
    repo_name = data['repo_name']
    commits = fetch_and_refine_commits(username, repo_name)
    
    astra_client = init_astra_db()

    # Assuming you have the correct credentials and database information
    for commit in commits:
        try:
            # Make sure the collection and keyspace are correctly named
            collection = astra_client.namespace("git").collection("git_commits")
            # Create the document in the collection
            response = collection.create(commit)
            if 'documentId' not in response:
                return jsonify({"status": "error", "message": "Failed to store a commit", "details": response}), 500
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    return jsonify({"status": "success", "message": "Commits stored successfully"})
# The rest of your Flask routes would remain the same

@app.route('/retrieve_commits', methods=['POST'])
def retrieve_commits():
    data = request.json
    repo_name = data['repo_name']
    commits = get_commits_by_repo_and_filters(repo_name)
    return jsonify({"commits": commits})

@app.route('/query_commits', methods=['POST'])
def query_commits():
    data = request.json
    repo_name = data['repo_name']
    # Example: Filtering by author; you can extend this with more filters like date.
    author = data.get('author', None)
    commits = get_commits_by_repo_and_filters(repo_name, author=author)
    return jsonify({"filtered_commits": commits})

@app.route('/chatbot_query', methods=['POST'])
def chatbot_query():
    data = request.json
    query = data['query']  # User's query
    api_key = data['api_key']  # OpenAI API key
    pdf_path = "path_to_your_generated_pdf.pdf"  # Adjust as necessary
    
    # Extract text from PDF
    pdf_text = extract_text_from_pdf(pdf_path)
    
    # Combine PDF text and user query as context for OpenAI
    combined_prompt = f"{pdf_text}\n\n{query}"
    
    openai.api_key = api_key
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=combined_prompt,
        temperature=0.5,
        max_tokens=1000,  # Adjust based on your needs
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return jsonify({"response": response.choices[0].text.strip()})




if __name__ == '__main__':
    app.run(debug=True)