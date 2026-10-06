import { apiPost } from "@/lib/api";

/**
 * Medical Partner / Driver registration — maps the Get Started form's flat
 * field names onto the backend's nested payload
 * (POST /api/v1/registrations/{medical|driver}).
 */

export type RegistrationPath = "partner" | "driver";
export type Fields = Record<string, string | string[]>;

export type RegistrationReceipt = {
  application_code: string;
  status: string;
  submitted_at: string;
};

const ENDPOINT: Record<RegistrationPath, string> = {
  partner: "/api/v1/registrations/medical",
  driver: "/api/v1/registrations/driver",
};

function text(fields: Fields, name: string): string | undefined {
  const v = fields[name];
  const s = (Array.isArray(v) ? v[0] : v)?.trim();
  return s ? s : undefined;
}

function list(fields: Fields, name: string): string[] {
  const v = fields[name];
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

function yesNo(fields: Fields, name: string): boolean | undefined {
  const v = text(fields, name);
  return v === undefined ? undefined : v === "yes";
}

export function toMedicalPartnerPayload(f: Fields) {
  return {
    organization: {
      name: text(f, "org"),
      type: text(f, "orgType"),
      locations: Number(text(f, "locations") ?? 1),
      service_address: text(f, "serviceAddress"),
      city: text(f, "city"),
      zip_code: text(f, "zip"),
      billing_address: text(f, "billingAddress"),
      market: text(f, "market"),
      decision_role: text(f, "decision"),
    },
    operations: {
      cargo_types: list(f, "cargo"),
      frequency: text(f, "frequency"),
      quantity: text(f, "quantity"),
      weekly_volume: text(f, "volume"),
      destinations: text(f, "destinations"),
      urgency: list(f, "urgency"),
      coverage_hours: list(f, "hours"),
      cold_chain: yesNo(f, "cold"),
      chain_of_custody: yesNo(f, "custody"),
      hipaa_handling: yesNo(f, "hipaa"),
      current_provider: text(f, "provider"),
      pain_points: text(f, "pain"),
      desired_start: text(f, "timeline"),
      notes: text(f, "notes"),
    },
    contact: {
      name: text(f, "name"),
      title: text(f, "role"),
      email: text(f, "email"),
      phone: text(f, "phone"),
      preferred_time: text(f, "contactTime"),
      preferred_method: text(f, "contactMethod"),
    },
  };
}

export function toDriverPayload(f: Fields) {
  return {
    identity: {
      full_name: text(f, "fullName"),
      email: text(f, "email"),
      phone: text(f, "phone"),
      city: text(f, "city"),
      zip_code: text(f, "zip"),
      preferred_contact_time: text(f, "contactTime"),
      preferred_contact_method: text(f, "contactMethod"),
    },
    qualifications: {
      years_driving: text(f, "yearsDriving"),
      license_class: text(f, "licenseClass"),
      has_valid_license: yesNo(f, "license"),
      primary_certification: text(f, "cert"),
      certifications: list(f, "certs"),
      medical_courier_experience: yesNo(f, "courierExp"),
      logistics_experience: yesNo(f, "logisticsExp"),
      vehicle_preference: text(f, "vehicle"),
      has_auto_insurance: yesNo(f, "insurance"),
      at_fault_accidents_3y: yesNo(f, "accidents"),
      willing_hipaa_training: yesNo(f, "training"),
      background_check_ack: text(f, "background") === "yes",
    },
    availability: {
      schedule: text(f, "availability"),
      work_types: list(f, "work"),
      start_when: text(f, "startWhen"),
      nights_weekends: yesNo(f, "nights"),
      market_coverage: text(f, "coverage"),
      notes: text(f, "notes"),
    },
  };
}

/**
 * Backend error field path (e.g. "contact.email") → form field name and the
 * step it lives on, so a server-side validation error can send the user back
 * to the right step with the right input focused.
 */
const FIELD_MAP: Record<RegistrationPath, Record<string, [name: string, step: number]>> = {
  partner: {
    "organization.name": ["org", 0],
    "organization.type": ["orgType", 0],
    "organization.locations": ["locations", 0],
    "organization.service_address": ["serviceAddress", 0],
    "organization.city": ["city", 0],
    "organization.zip_code": ["zip", 0],
    "organization.billing_address": ["billingAddress", 0],
    "organization.market": ["market", 0],
    "organization.decision_role": ["decision", 0],
    "operations.cargo_types": ["cargo", 1],
    "operations.frequency": ["frequency", 1],
    "operations.quantity": ["quantity", 1],
    "operations.weekly_volume": ["volume", 1],
    "operations.destinations": ["destinations", 1],
    "operations.urgency": ["urgency", 1],
    "operations.coverage_hours": ["hours", 1],
    "operations.current_provider": ["provider", 1],
    "operations.pain_points": ["pain", 1],
    "operations.desired_start": ["timeline", 1],
    "operations.notes": ["notes", 1],
    "contact.name": ["name", 2],
    "contact.title": ["role", 2],
    "contact.email": ["email", 2],
    "contact.phone": ["phone", 2],
    "contact.preferred_time": ["contactTime", 2],
    "contact.preferred_method": ["contactMethod", 2],
  },
  driver: {
    "identity.full_name": ["fullName", 0],
    "identity.email": ["email", 0],
    "identity.phone": ["phone", 0],
    "identity.city": ["city", 0],
    "identity.zip_code": ["zip", 0],
    "identity.preferred_contact_time": ["contactTime", 0],
    "identity.preferred_contact_method": ["contactMethod", 0],
    "qualifications.years_driving": ["yearsDriving", 1],
    "qualifications.license_class": ["licenseClass", 1],
    "qualifications.has_valid_license": ["license", 1],
    "qualifications.primary_certification": ["cert", 1],
    "qualifications.certifications": ["certs", 1],
    "qualifications.has_auto_insurance": ["insurance", 1],
    "qualifications.background_check_ack": ["background", 1],
    "availability.schedule": ["availability", 2],
    "availability.work_types": ["work", 2],
    "availability.start_when": ["startWhen", 2],
    "availability.market_coverage": ["coverage", 2],
    "availability.notes": ["notes", 2],
  },
};

export function locateField(path: RegistrationPath, apiField: string) {
  // Array item errors come back as e.g. "operations.cargo_types.0".
  const key = apiField.replace(/\.\d+$/, "");
  const hit = FIELD_MAP[path][key];
  return hit ? { name: hit[0], step: hit[1] } : null;
}

export function submitRegistration(path: RegistrationPath, fields: Fields, signal?: AbortSignal) {
  const payload = path === "partner" ? toMedicalPartnerPayload(fields) : toDriverPayload(fields);
  return apiPost<RegistrationReceipt>(ENDPOINT[path], payload, signal);
}
