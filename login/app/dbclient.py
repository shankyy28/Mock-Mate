import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

def connect_client():
    # Linking the database
    url = os.getenv("DATABASE_URL")
    key = os.getenv("DATABASE_KEY")

    if not url:
        raise AssertionError("database URL not defined in environment")

    if not key:
        raise AssertionError("database API key not defined in environment")

    db_client = create_client(url, key)

    print ("Client connection successful")

    return db_client