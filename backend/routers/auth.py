from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
import auth_utils

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_or_create_role(db: Session, role_name: models.RoleName) -> models.Role:
    role = db.query(models.Role).filter(models.Role.name == role_name).first()
    if not role:
        role = models.Role(name=role_name)
        db.add(role)
        db.commit()
        db.refresh(role)
    return role


@router.post("/register", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: schemas.UserRegister, db: Session = Depends(get_db)):
    # Duplicate-email check
    existing_user = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    role = get_or_create_role(db, payload.role)

    new_user = models.User(
        full_name=payload.full_name,
        email=payload.email,
        hashed_password=auth_utils.hash_password(payload.password),
        role_id=role.id,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=schemas.Token)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    # Invalid-login check (wrong email OR wrong password -> same generic error,
    # so we don't leak which one was wrong)
    if not user or not auth_utils.verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = auth_utils.create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role.name.value}
    )

    return schemas.Token(access_token=access_token, user=user)
