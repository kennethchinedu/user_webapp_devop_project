provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "dev_vpc" {
  cidr_block = "192.22.0.0/16"
}

resource "aws_subnet" "pub_subnet1" {
  vpc_id = aws_vpc.dev_vpc.id 
  cidr_block = "192.22.0.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true

}

resource "aws_subnet" "pub_subnet2" {
  vpc_id = aws_vpc.dev_vpc.id 
  cidr_block = "192.22.1.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true 
}

#internet gateway for vpc
resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.dev_vpc.id
}

# #Route table for our vpc
resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.dev_vpc.id  
    #This internet gateway allows all network access to our vpc
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gateway.id
  }

  tags = {
    Name = "dashbord_route_table"
  }
}

#Route table association
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.pub_subnet1.id  
  route_table_id = aws_route_table.rt.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.pub_subnet2.id  
  route_table_id = aws_route_table.rt.id
}


resource "aws_security_group" "sg" {
    name = "user_mgt_sg"
    description = "Allow TLS inbound traffic and all outbound traffic"
    vpc_id = aws_vpc.dev_vpc.id    


  ingress {
    description = "HTTP TLS to VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP TLS to VPC"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

   ingress {
    description = "SSH to VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

#Allow all traffic
  egress {
    description = "Allow all traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  } 
  tags = {
     Name = "allow inboud 3000"
   }
}

resource "aws_instance" "server1" {
  vpc_security_group_ids = [aws_security_group.sg.id]
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id             = aws_subnet.pub_subnet1.id    
  user_data = base64encode(file("setup.sh"))

  tags = {
    Name = "dev-server1"
  }

}

resource "aws_instance" "server2" {
  vpc_security_group_ids = [aws_security_group.sg.id]
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id             = aws_subnet.pub_subnet2.id    
  user_data = base64encode(file("setup.sh"))

  tags = {
    Name = "dev-server2"
  }

}

#load balancer
resource "aws_lb" "lb" {
  name = "userdash"
  internal = false 
  load_balancer_type = "application" 
  security_groups = [aws_security_group.sg.id]
  subnets = [ aws_subnet.pub_subnet1.id, aws_subnet.pub_subnet2.id ]
  
  tags = {
    name = "userdash-load-balancer"
  }
}

#creating target groups
resource "aws_lb_target_group" "tg" {
  name = "mytg"  # no underscores
  port = 3000  
  protocol = "HTTP"
  vpc_id = aws_vpc.dev_vpc.id     

  # Including health check
  health_check {
    path = "/"
    port = "traffic-port"
  }
}

#Target group attachement to ec2 1
resource "aws_lb_target_group_attachment" "attach_server1" {
  target_group_arn = aws_lb_target_group.tg.arn 
  target_id = aws_instance.server1.id 
  port = 3000
}

#Target group attachement to ec2 2
resource "aws_lb_target_group_attachment" "attach_server2" {
  target_group_arn = aws_lb_target_group.tg.arn 
  target_id = aws_instance.server2.id 
  port = 3000
}

resource "aws_lb_listener" "lb_listener" {
  load_balancer_arn = aws_lb.lb.arn  
  port = 80 
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.tg.arn 
    type = "forward"
  }
}

output "loadbancerip" {
  value = aws_lb.lb.dns_name
}