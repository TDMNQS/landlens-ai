from pydantic import BaseModel, EmailStr, Field, field_validator
from models import RoleName


class UserRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: RoleName = RoleName.buyer


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: RoleName

    class Config:
        from_attributes = True  # pydantic v2

    @field_validator("role", mode="before")
    @classmethod
    def extract_role_name(cls, value):
        # `value` arrives as the related Role ORM object (user.role); pull out its enum
        return getattr(value, "name", value)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
