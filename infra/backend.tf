terraform {
  backend "s3" {
    bucket = "terraform-state-file-anams"
    #dynamodb_table = "lock_files"
    key    = "global/mystatefile/terraform.tfstate"
    region = "us-east-1"
  }
}
