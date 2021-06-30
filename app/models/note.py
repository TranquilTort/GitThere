from .db import db
from datetime import datetime

class Notes(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title =db.Column(db.String, nullable=False)
    body =db.Column(db.String, nullable=False)
