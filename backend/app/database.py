from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# SQLite database path
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./medassist.db")

# For SQLite, we need to set connect_args={"check_same_thread": False}
# as SQLite only allows one thread to communicate with it by default.
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
