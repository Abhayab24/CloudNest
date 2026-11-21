
variable "aws_region" {
  description = "AWS region for CloudNest"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_allowed_cidr" {
  description = "Your public IP allowed to SSH"
  type        = string
  default     = "117.251.86.146/32"
}

variable "public_key_path" {
  description = "Path to the SSH public key"
  type        = string
  default     = "~/.ssh/cloudnest-ec2.pub"
}
