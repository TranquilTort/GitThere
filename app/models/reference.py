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

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title":self.title,
            "body":self.body,
            "created_at":self.created_at.strftime("%m/%d/%Y, %-I:%M%p")
        }
