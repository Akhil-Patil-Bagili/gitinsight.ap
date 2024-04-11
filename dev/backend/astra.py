# import requests

# class AstraDBClient:
#     def __init__(self, token, base_url):
#         self.token = token
#         self.headers = {
#             "X-Cassandra-Token": self.token,
#             "Content-Type": "application/json"
#         }
#         self.base_url = base_url

#     def create_document(self, keyspace, collection, document):
#         url = f"{self.base_url}/api/rest/v2/namespaces/{keyspace}/collections/{collection}"
#         response = requests.post(url, json=document, headers=self.headers)
#         if response.status_code not in [200, 201]:
#             raise Exception(f"Failed to create document: {response.text}")
#         return response.json()

# def init_astra_db():
#     token = "AstraCS:rgGEIaCfxSIHBSzaivGCRdMT:fd0c77dde15701fd47387a32e560edaf2df1d3ca94ee471f763c7ca8758e72bc"
#     base_url = "https://fa8e6a4d-030b-4c1d-9a9e-1fc6dd90b49a-us-east-1.apps.astra.datastax.com"
#     return AstraDBClient(token, base_url)


# astra.py
from astrapy.db import create_client

# Initialize AstraDB client with your token and the base URL for the document API
def init_astra_db():
    astra_client = create_client(
        astra_database_id="fa8e6a4d-030b-4c1d-9a9e-1fc6dd90b49a", 
        astra_database_region="fa8e6a4d-030b-4c1d-9a9e-1fc6dd90b49a", 
        astra_application_token="AstraCS:rgGEIaCfxSIHBSzaivGCRdMT:fd0c77dde15701fd47387a32e560edaf2df1d3ca94ee471f763c7ca8758e72bc"
    )
    return astra_client
