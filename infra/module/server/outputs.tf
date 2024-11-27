output "ec2_public_ip1" {
  value = aws_instance.server1.public_ip
}

output "ec2_public_ip2" {
  value = aws_instance.server2.public_ip
}

output "dns_name" {
  description = "The DNS name of the load balancer"
  value       = aws_lb.lb.dns_name
}


output "user_name" {
  description = "The username for SSH access"
  value       = "ubuntu"  
}


