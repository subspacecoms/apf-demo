output "dashboard_id" {
  description = "The ID of the created GCP Cloud Monitoring dashboard"
  value       = google_monitoring_dashboard.app_dashboard.id
}

output "high_5xx_alert_policy_id" {
  description = "The ID of the 5xx error rate alert policy"
  value       = google_monitoring_alert_policy.high_5xx_error_rate.id
}

output "high_latency_alert_policy_id" {
  description = "The ID of the high p95 latency alert policy"
  value       = google_monitoring_alert_policy.high_p95_latency.id
}
