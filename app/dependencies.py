# Placeholder for database connection setup
# Example: MongoDB connection using Motor
from motor.motor_asyncio import AsyncIOMotorClient

DATABASE_URL = "mongodb+srv://Andrei:Andrei@cluster0.so7o1cf.mongodb.net/"

client = AsyncIOMotorClient(DATABASE_URL)
database = client.maintenance_dashboard

async def get_nosql_db():
    return database
