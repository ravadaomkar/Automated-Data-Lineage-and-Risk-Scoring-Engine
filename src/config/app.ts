// Application-level runtime tuning. Domain vocab (rules, regions) lives in
// src/constants; this file is for "how the app behaves" knobs.

export const MOCK_STREAM_CONFIG = {
  BATCH_INTERVAL_MS: 700,
  BATCH_SIZE: 3,
  VISIBLE_LIMIT: 60,
  INITIAL_COUNT: 24,
  BASE_TPS: 8500,
  SPARKLINE_LENGTH: 40,
};

export const DASHBOARD_CONFIG = {
  DEFAULT_ERROR_RATE: 12.3,
  SLA_TARGET: 99.99,
};
