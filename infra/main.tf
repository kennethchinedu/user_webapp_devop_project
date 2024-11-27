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
