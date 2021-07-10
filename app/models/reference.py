from .db import db
from .user_reference import user_reference
from datetime import datetime

class Reference(db.Model):
    __tablename__ = "references"
    id = db.Column(db.Integer, primary_key=True)
    title =db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
