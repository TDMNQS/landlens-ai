import os
import sys

# Make sure backend/ (parent of tests/) is on sys.path so "import main" works
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from database import Base, get_db

# Separate test DB so we never touch landlens.db
TEST_DATABASE_URL = "sqlite:///./test_landlens.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)

VALID_USER = {
    "full_name": "Numan Khan",
    "email": "numan@example.com",
    "password": "SecurePass123",
    "role": "buyer",
}


def test_register_success():
    response = client.post("/auth/register", json=VALID_USER)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == VALID_USER["email"]
    assert "hashed_password" not in data  # password should never leak in response


def test_duplicate_email_registration_fails():
    client.post("/auth/register", json=VALID_USER)  # first time: succeeds
    response = client.post("/auth/register", json=VALID_USER)  # second time: same email
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()


def test_login_success():
    client.post("/auth/register", json=VALID_USER)
    response = client.post(
        "/auth/login",
        json={"email": VALID_USER["email"], "password": VALID_USER["password"]},
    )
    assert response.status_code == 200
    body = response.json()
    assert "access_token" in body
    assert body["user"]["email"] == VALID_USER["email"]


def test_login_wrong_password_fails():
    client.post("/auth/register", json=VALID_USER)
    response = client.post(
        "/auth/login",
        json={"email": VALID_USER["email"], "password": "WrongPassword1"},
    )
    assert response.status_code == 401


def test_login_nonexistent_email_fails():
    response = client.post(
        "/auth/login",
        json={"email": "doesnotexist@example.com", "password": "whatever123"},
    )
    assert response.status_code == 401
