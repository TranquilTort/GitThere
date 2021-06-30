from .db import db
from datetime import datetime
from .application_note import application_note

class Application(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    applicant = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, )
    company = db.Column(db.String, nullable=False)
    job_title = db.Column(db.String, nullable=False)
    job_description = db.Column(db.Text)
    address = db.Column(db.String, nullable=False)
    status = db.Column(db.Integer, nullable=False)
    resume = db.Column(db.String)
    cv = db.Column(db.String)
    cover_letter = db.Column(db.String)
    priority = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    notes = db.relationship("Note", secondary=application_note, back_populates="application")
