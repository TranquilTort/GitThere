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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    application = db.relationship("Application",  back_populates="notes")


    def to_dict(self):
        return {
            "id":self.id,
            "application_id":self.application_id,
            "title":self.title,
            "body":self.body,
            "created_at":self.created_at
        }
