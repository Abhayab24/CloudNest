
# Get the existing default VPC
data "aws_vpc" "default" {
  default = true
}

# Get subnets in the default VPC
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Find the latest Ubuntu 24.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Register our public SSH key with AWS
resource "aws_key_pair" "cloudnest" {
  key_name   = "cloudnest-terraform-key"
  public_key = file(pathexpand(var.public_key_path))

  tags = {
    Project = "CloudNest"
  }
}

# Security group for CloudNest
resource "aws_security_group" "cloudnest" {
  name        = "cloudnest-security-group"
  description = "Security group for CloudNest EC2"
  vpc_id      = data.aws_vpc.default.id

  # SSH - only your IP
  ingress {
    description = "SSH from my computer"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_allowed_cidr]
  }

  # HTTP
  ingress {
    description = "HTTP traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "CloudNest-SG"
    Project = "CloudNest"
  }
}

# Create CloudNest EC2 instance
resource "aws_instance" "cloudnest" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.cloudnest.id]
  key_name               = aws_key_pair.cloudnest.key_name

  root_block_device {
    volume_size = 12
    volume_type = "gp3"
  }

  tags = {
    Name    = "CloudNest-Server"
    Project = "CloudNest"
  }
}
