# S3 File Management with Next.js, Tailwind, and Prisma

This project demonstrates how to build a web application using **Next.js**, **TailwindCSS**, and **Prisma** to store, retrieve, and delete files in **AWS S3**. The app interacts with S3 using the **AWS SDK**, and leverages **IAM roles** to ensure secure access to the bucket. The core functionality revolves around uploading images, resizing them for better performance, and securely managing them via signed URLs.

## Features

- **File Storage:** Store images in an AWS S3 bucket.
- **Image Resizing:** Uploaded images are resized (e.g., to Instagram or TikTok post dimensions) using **Sharp** before being saved to S3.
- **Database Integration:** File metadata (like names and captions) are stored in a **PostgreSQL** database using **Prisma** ORM.
- **Secure Access:** Users can upload, download, and delete files with restricted access via **IAM roles** and signed URLs.
- **Temporary Access:** Files are accessed through pre-signed URLs, which expire after a defined time (1 hour).

## Security Considerations

- **IAM Policies**: The project uses IAM policies to control access to the S3 bucket. Only the required permissions (upload, download, delete) are granted to the users interacting with the app.
- **No Public Deployment**: This project is not deployed publicly, to avoid misuse such as excessive uploads to the S3 bucket.

## Project Structure

- **S3 Integration**: The app integrates with AWS S3 using the **AWS SDK**, where images are uploaded after being processed and resized with **Sharp**.
- **Database Operations**: **Prisma** is used to manage posts, which include references to the images in S3.
- **Signed URLs**: For secure file access, the application generates signed URLs for images, which are valid for a limited time.

## Screenshots and video

[Video example](https://youtu.be/UezW0tpU19I)


![image](https://github.com/user-attachments/assets/0e7c1403-bd12-4c6a-833d-2ac635993f4a)
![image](https://github.com/user-attachments/assets/a72a70df-e76f-42b9-8535-954a32c895fb)
![image](https://github.com/user-attachments/assets/300ecf2e-de15-4bea-a78a-605237f600bf)



## Libraries Used

- **@aws-sdk/client-s3**
- **@aws-sdk/s3-request-presigner**
- **Prisma**
- **Sharp**
- **TailwindCSS**
- **dotenv**
