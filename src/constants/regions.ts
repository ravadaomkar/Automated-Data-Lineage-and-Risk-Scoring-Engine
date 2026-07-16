export const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"] as const;

export type Region = (typeof REGIONS)[number];
