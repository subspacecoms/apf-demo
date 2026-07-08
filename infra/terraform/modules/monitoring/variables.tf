variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "service_name" {
  description = "The Cloud Run service name to monitor"
  type        = string
  default     = "casas-bahia-server"
}

variable "notification_channels" {
  description = "List of notification channel IDs for alerts"
  type        = list(string)
  default     = []
}
