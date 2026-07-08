resource "google_monitoring_dashboard" "app_dashboard" {
  project        = var.project_id
  dashboard_json = jsonencode({
    displayName = "Casas Bahia - Service Monitoring (${var.service_name})"
    gridLayout = {
      columns = "2"
      widgets = [
        {
          title = "Request Volume by Status Code"
          xyChart = {
            dataSets = [
              {
                timeSeriesQuery = {
                  timeSeriesFilter = {
                    filter = "metric.type=\"cloudrun.googleapis.com/request_count\" resource.type=\"cloud_run_revision\" resource.label.service_name=\"${var.service_name}\""
                    aggregation = {
                      perSeriesAligner   = "ALIGN_RATE"
                      crossSeriesReducer = "REDUCE_SUM"
                      groupByFields      = ["metric.label.response_code_class"]
                    }
                  }
                }
              }
            ]
          }
        },
        {
          title = "Latency (p95 & p50)"
          xyChart = {
            dataSets = [
              {
                timeSeriesQuery = {
                  timeSeriesFilter = {
                    filter = "metric.type=\"cloudrun.googleapis.com/request_latencies\" resource.type=\"cloud_run_revision\" resource.label.service_name=\"${var.service_name}\""
                    aggregation = {
                      perSeriesAligner   = "ALIGN_DELTA"
                      crossSeriesReducer = "REDUCE_PERCENTILE_95"
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  })
}

resource "google_monitoring_alert_policy" "high_5xx_error_rate" {
  project      = var.project_id
  display_name = "Cloud Run - High 5xx Error Rate (>1%) - ${var.service_name}"
  combiner     = "OR"
  conditions {
    display_name = "5xx Error Rate > 1%"
    condition_threshold {
      filter          = "metric.type=\"cloudrun.googleapis.com/request_count\" resource.type=\"cloud_run_revision\" resource.label.service_name=\"${var.service_name}\" metric.label.response_code_class=\"5xx\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.01
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }

  notification_channels = var.notification_channels
}

resource "google_monitoring_alert_policy" "high_p95_latency" {
  project      = var.project_id
  display_name = "Cloud Run - High p95 Latency (>2.5s) - ${var.service_name}"
  combiner     = "OR"
  conditions {
    display_name = "p95 Latency > 2500ms"
    condition_threshold {
      filter          = "metric.type=\"cloudrun.googleapis.com/request_latencies\" resource.type=\"cloud_run_revision\" resource.label.service_name=\"${var.service_name}\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 2500
      aggregations {
        alignment_period     = "60s"
        per_series_aligner   = "ALIGN_DELTA"
        cross_series_reducer = "REDUCE_PERCENTILE_95"
      }
    }
  }

  notification_channels = var.notification_channels
}
