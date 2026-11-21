
output "instance_id" {
  description = "CloudNest EC2 instance ID"
  value       = aws_instance.cloudnest.id
}

output "public_ip" {
  description = "CloudNest public IP"
  value       = aws_instance.cloudnest.public_ip
}

output "public_dns" {
  description = "CloudNest public DNS"
  value       = aws_instance.cloudnest.public_dns
}

output "ssh_command" {
  description = "SSH command to connect to CloudNest"
  value       = "ssh -i ~/.ssh/cloudnest-ec2 ubuntu@${aws_instance.cloudnest.public_ip}"
}
