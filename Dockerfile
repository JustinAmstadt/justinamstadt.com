# Step 1: Use an official Python runtime as the base image
FROM python:3.12.4-slim

# Step 2: Set environment variables
ENV PYTHONUNBUFFERED 1

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Install system dependencies (e.g., for PostgreSQL or other DB if necessary)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Step 5: Install Python dependencies
COPY requirements.txt /app/

# Install the Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Step 6: Copy the Django project code into the container
COPY . /app/

# Step 7: Expose the default Django port
EXPOSE 8000

# Step 8: Run migrations automatically and then start the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]