provider "aws" {
  region = "us-east-1"
}

module "app-deployment" {
  source              = "./module/server"
  region_main = "us-east-1"
  cidr = var.cidr
  availability_zone_a = var.availability_zone_a
  availability_zone_b = var.availability_zone_b
  ami                 = var.ami
  instance_type       = var.instance_type
}



# Use module outputs instead of direct resource references
output "ec2_public_ip1" {
  value = module.app-deployment.ec2_public_ip1
}

output "ec2_public_ip2" {
  value = module.app-deployment.ec2_public_ip2
}

output "dns_name" {
  description = "The DNS name of the load balancer"
  value       = module.app-deployment.dns_name
}


output "user_name" {
  description = "user name for server"
  value       = module.app-deployment.user_name
}

