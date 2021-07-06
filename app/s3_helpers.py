import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "docx"}

s3 = boto3.client(
    service_name="s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
    endpoint_url=S3_LOCATION,
)


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    print(os.environ.get("S3_SECRET"))
    print(os.environ.get("S3_KEY"))
    print(BUCKET_NAME)
    print("response:",s3.list_buckets())
    try:
        print('filename:',file.filename )
        print("response:",s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        ))
    except Exception as e:
        print("EXCEPTION:", str(e))
        # in case the our s3 upload fails
        print("S3 upload failed")
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

 # reference: https://hackmd.io/@jpshafto/SyWY45KGu
