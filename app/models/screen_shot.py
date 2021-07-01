from .db import db
from .application_screen_shot import application_screen_shot


class ScreenShot(db.Model):
    __tablename__ = "screen_shots"
    id = db.Column(db.Integer, primary_key=True)
    title =db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)

    application = db.relationship("Application", secondary=application_screen_shot, back_populates="screen_shots")
