from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user_reference import user_reference
class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  apply_weekly_goal = db.Column(db.Integer)
  base_resume = db.Column(db.String)
  base_cv = db.Column(db.String)
  base_cover_letter = db.Column(db.String)

  applications = db.relationship("Application", backref="user")
  references = db.relationship("Reference", cascade="all,delete",  backref="user")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "apply_weekly_goal": self.apply_weekly_goal
    }
