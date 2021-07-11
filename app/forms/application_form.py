from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class ApplicationForm(FlaskForm):
    status = IntegerField("status")
    applicant = IntegerField("applicant",)
    company = StringField("company", validators=[DataRequired()])
    url_link = TextAreaField("url_link")
    job_title = StringField("job_title", validators=[DataRequired()])
    job_description = TextAreaField("job_description")
    address = StringField("address")
    priority = BooleanField("priority")
