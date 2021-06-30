from app.models import application
from .db import db

application_note = db.Table(
    'application_notes',
    db.Column(
        "application_id",
        db.Integer,
        db.ForeignKey("applications.id"),
        primary_key=True
    ),
    db.Column(
        "note_id",
        db.Integer,
        db.ForeignKey("notes.id"),
        primary_key=True
    )
)
