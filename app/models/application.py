from .db import db
from datetime import datetime
from .application_note import application_note
from .application_screen_shot import application_screen_shot


class Application(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    applicant = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, )
    company = db.Column(db.String, nullable=False)
    url_link = db.Column(db.Text)
    job_title = db.Column(db.String, nullable=False)
    job_description = db.Column(db.Text)
    address = db.Column(db.String)
    status = db.Column(db.Integer, nullable=False)
    resume = db.Column(db.String)
    cv = db.Column(db.String)
    cover_letter = db.Column(db.String)
    priority = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    notes = db.relationship("Note",cascade="all,delete", backref="application")
    screen_shots = db.relationship("ScreenShot", secondary=application_screen_shot, back_populates="application")

    def to_dict(self):

        return {
            "id":self.id,
            "applicant": self.applicant,
            "company": self.company,
            "url_link": self.url_link,
            "job_title": self.job_title,
            "job_description":self.job_description,
            "address": self.address,
            "status": self.status,
            "resume":self.resume,
            "cv": self.cv,
            "cover_letter": self.cover_letter,
            "priority": self.priority,
            "created_at": self.created_at.strftime("%m/%d/%Y, %-I:%M%p"),
            "updated_at": self.updated_at.strftime("%m/%d/%Y, %-I:%M%p"),
        }
