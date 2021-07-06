from app.models import application
from .db import db
from datetime import datetime
from .application_note import application_note

class Note(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey("applications.id"))
    title =db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    application = db.relationship("Application",  back_populates="notes")
