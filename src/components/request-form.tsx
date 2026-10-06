import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox, Input, Label, Select, Textarea } from "@/components/ui/field";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/cn";
import {
  locateField,
  submitRegistration,
  type Fields,
  type RegistrationPath as Path,
} from "@/lib/registration";
import {
  CARGO_TYPES,
  CERTIFICATIONS,
  CONTACT_METHODS,
  CONTACT_TIMES,
  COVERAGE,
  DECISION_ROLES,
  FREQUENCY,
  LICENSE_CLASSES,
  ORG_TYPES,
  PICKUP_HOURS,
  DRIVER_WORK,
  QUANTITY,
  SITE,
  START_WHEN,
  URGENCY_NEEDS,
  VEHICLE_TYPES,
  YEARS_DRIVING,
  YES_NO,
} from "@/lib/site";

type Sent = { id: string; at: string; path: Path };

const PARTNER_STEPS = [
  { n: "01", title: "Organization" },
  { n: "02", title: "Operations" },
  { n: "03", title: "Contact" },
] as const;

const DRIVER_STEPS = [
  { n: "01", title: "Identity" },
  { n: "02", title: "Qualifications" },
  { n: "03", title: "Availability" },
] as const;

const PARTNER_REQUIRED: Record<number, string[]> = {
  0: ["org", "orgType", "serviceAddress", "locations", "market"],
  1: ["cargo", "frequency", "quantity", "volume"],
  2: ["name", "role", "email", "phone", "contactTime"],
};

const DRIVER_REQUIRED: Record<number, string[]> = {
  0: ["fullName", "email", "phone", "city", "contactTime"],
  1: ["license", "licenseClass", "yearsDriving", "cert", "insurance", "background"],
  2: ["availability", "startWhen"],
};

function readFields(form: HTMLFormElement): Fields {
  const fd = new FormData(form);
  const out: Fields = {};
  for (const [key, value] of fd.entries()) {
    const next = String(value);
    if (key in out) {
      const prev = out[key];
      out[key] = Array.isArray(prev) ? [...prev, next] : [prev, next];
    } else {
      out[key] = next;
    }
  }
  return out;
}

function missingFrom(fields: Fields, names: string[]) {
  return names.filter((name) => {
    const v = fields[name];
    if (Array.isArray(v)) return v.length === 0;
    return !v?.trim();
  });
}

function focusField(form: HTMLFormElement, name: string) {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLElement) el.focus();
  else if (el instanceof RadioNodeList && el[0] instanceof HTMLElement) el[0].focus();
}

/** Merge this step's inputs over earlier answers, dropping un-ticked checkboxes. */
function mergeStep(prev: Fields, current: Fields, form: HTMLFormElement): Fields {
  const next = { ...prev };
  for (const el of Array.from(form.elements)) {
    if (el instanceof HTMLInputElement && el.type === "checkbox") delete next[el.name];
  }
  return { ...next, ...current };
}

function str(fields: Fields, name: string, fallback = "") {
  const v = fields[name];
  return Array.isArray(v) ? (v[0] ?? fallback) : (v ?? fallback);
}

function selected(fields: Fields, name: string, value: string) {
  const v = fields[name];
  return Array.isArray(v) ? v.includes(value) : v === value;
}

function Checkset({
  legend,
  name,
  options,
  fields,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  fields: Fields;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium tracking-wide text-muted">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label key={o.value} className="flex min-h-11 items-center gap-2 text-sm text-fg">
            <Checkbox name={name} value={o.value} defaultChecked={selected(fields, name, o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  children,
  wide,
}: {
  id?: string;
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export function RequestForm({ initialPath = "partner" }: { initialPath?: Path }) {
  const [path, setPath] = useState<Path>(initialPath);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>({});
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<Sent | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Field to focus once the step it lives on has rendered (server-side errors
  // can point at an earlier step than the one the user is on).
  const pendingFocus = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const steps = path === "partner" ? PARTNER_STEPS : DRIVER_STEPS;
  const required = path === "partner" ? PARTNER_REQUIRED : DRIVER_REQUIRED;

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const name = pendingFocus.current;
    if (!name || !formRef.current) return;
    pendingFocus.current = null;
    focusField(formRef.current, name);
  }, [step]);

  function switchPath(next: Path) {
    abortRef.current?.abort();
    setSubmitting(false);
    setPath(next);
    setStep(0);
    setFields({});
    setError(null);
    setSent(null);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const merged = mergeStep(fields, readFields(form), form);
    const missing = missingFrom(merged, required[step] ?? []);
    if (missing.length) {
      setError("Fill the required fields, then continue.");
      focusField(form, missing[0]);
      return;
    }
    setFields(merged);
    setError(null);
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setSubmitting(true);
    try {
      const receipt = await submitRegistration(path, merged, controller.signal);
      setSent({ id: receipt.application_code, at: receipt.submitted_at, path });
    } catch (err) {
      if (controller.signal.aborted) return;
      if (err instanceof ApiError) {
        const first = err.fieldErrors[0];
        const located = first ? locateField(path, first.field) : null;
        setError(first ? `${first.message}.` : err.message);
        if (located) {
          if (located.step === step) focusField(form, located.name);
          else {
            pendingFocus.current = located.name;
            setStep(located.step);
          }
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setSubmitting(false);
      }
    }
  }

  if (sent) {
    const subject = `${sent.path === "partner" ? "Medical Partner" : "Driver"} application ${sent.id}`;
    return (
      <div className="rounded-xl bg-elevated p-8 shadow-[0_0_0_1px_var(--color-line)]">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          Application received
        </p>
        <h2 className="mt-3 font-display text-4xl text-fg">We have it.</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Confirmation {sent.id}.{" "}
          {sent.path === "partner"
            ? "Operations will review cargo, frequency, and fit for a Launch in Phoenix or San Diego."
            : "Operations will review driving experience, certifications, and availability in Phoenix or San Diego."}{" "}
          Keep this number for your records — you can email the team any time with questions.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Confirmation ${sent.id}\n\n`,
          )}`}
          className="mt-6 inline-block font-display text-2xl text-gold"
        >
          Email {SITE.email}
        </a>
        <div className="mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSent(null);
              setStep(0);
              setFields({});
              setError(null);
            }}
          >
            File another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => switchPath("partner")}
          className={cn(
            "min-h-11 rounded-md px-3 text-sm font-semibold shadow-[0_0_0_1px_var(--color-line)]",
            path === "partner" ? "bg-gold text-gold-fg" : "bg-elevated text-fg hover:bg-surface",
          )}
        >
          Medical Partner
        </button>
        <button
          type="button"
          onClick={() => switchPath("driver")}
          className={cn(
            "min-h-11 rounded-md px-3 text-sm font-semibold shadow-[0_0_0_1px_var(--color-line)]",
            path === "driver" ? "bg-gold text-gold-fg" : "bg-elevated text-fg hover:bg-surface",
          )}
        >
          Driver
        </button>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-6">
        <ol className="grid grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <li key={s.n}>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setError(null);
                  setStep(i);
                }}
                className={cn(
                  "w-full rounded-md px-3 py-3 text-left shadow-[0_0_0_1px_var(--color-line)]",
                  i === step ? "bg-elevated" : "bg-transparent hover:bg-elevated/60",
                )}
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-kicker text-gold">{s.n}</p>
                <p className={cn("mt-1 text-xs font-semibold leading-tight sm:text-sm", i === step ? "text-fg" : "text-muted")}>
                  {s.title}
                </p>
              </button>
            </li>
          ))}
        </ol>

        {path === "partner" && step === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="org" label="Organization name" wide>
              <Input id="org" name="org" required autoComplete="organization" defaultValue={str(fields, "org")} />
            </Field>
            <Field id="orgType" label="Organization type">
              <Select id="orgType" name="orgType" required defaultValue={str(fields, "orgType", "clinic")}>
                {ORG_TYPES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="locations" label="Number of locations">
              <Input id="locations" name="locations" type="number" min={1} required defaultValue={str(fields, "locations", "1")} />
            </Field>
            <Field id="serviceAddress" label="Service address" wide>
              <Input id="serviceAddress" name="serviceAddress" required autoComplete="street-address" defaultValue={str(fields, "serviceAddress")} />
            </Field>
            <Field id="city" label="City">
              <Input id="city" name="city" defaultValue={str(fields, "city")} autoComplete="address-level2" placeholder="Chandler or San Diego" />
            </Field>
            <Field id="zip" label="ZIP">
              <Input id="zip" name="zip" defaultValue={str(fields, "zip")} autoComplete="postal-code" />
            </Field>
            <Field id="market" label="Target market" wide>
              <Select id="market" name="market" required defaultValue={str(fields, "market", "east-valley")}>
                {COVERAGE.filter((o) => o.value !== "no").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="billingAddress" label="Billing address if different" wide>
              <Input id="billingAddress" name="billingAddress" defaultValue={str(fields, "billingAddress")} />
            </Field>
            <Field id="decision" label="Your role in a Launch decision" wide>
              <Select id="decision" name="decision" defaultValue={str(fields, "decision", "ops")}>
                {DECISION_ROLES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}

        {path === "partner" && step === 1 ? (
          <div className="grid gap-5">
            <Checkset legend="Type of cargo shipped" name="cargo" options={CARGO_TYPES} fields={fields} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="frequency" label="How often">
                <Select id="frequency" name="frequency" required defaultValue={str(fields, "frequency", "several")}>
                  {FREQUENCY.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="quantity" label="Typical quantity">
                <Select id="quantity" name="quantity" required defaultValue={str(fields, "quantity", "1-4")}>
                  {QUANTITY.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="volume" label="Estimated weekly volume">
                <Input id="volume" name="volume" required placeholder="e.g. 12 trips / week" defaultValue={str(fields, "volume")} />
              </Field>
              <Field id="destinations" label="Typical destinations / week">
                <Input id="destinations" name="destinations" placeholder="e.g. 3 labs, 1 pharmacy" defaultValue={str(fields, "destinations")} />
              </Field>
            </div>
            <Checkset legend="Delivery urgency" name="urgency" options={URGENCY_NEEDS} fields={fields} />
            <Checkset legend="Hours you need coverage" name="hours" options={PICKUP_HOURS} fields={fields} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="cold" label="Cold chain">
                <Select id="cold" name="cold" defaultValue={str(fields, "cold", "yes")}>
                  {YES_NO.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="custody" label="Chain of custody">
                <Select id="custody" name="custody" defaultValue={str(fields, "custody", "yes")}>
                  {YES_NO.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="hipaa" label="HIPAA / BBP handling">
                <Select id="hipaa" name="hipaa" defaultValue={str(fields, "hipaa", "yes")}>
                  {YES_NO.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="provider" label="Current courier if any">
                <Input id="provider" name="provider" defaultValue={str(fields, "provider")} />
              </Field>
            </div>
            <Field id="pain" label="Current courier pain points" wide>
              <Textarea id="pain" name="pain" defaultValue={str(fields, "pain")} placeholder="Late STAT, no tracking, broken chain of custody…" />
            </Field>
            <Field id="timeline" label="Desired Launch Program start" wide>
              <Select id="timeline" name="timeline" defaultValue={str(fields, "timeline", "30d")}>
                {START_WHEN.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="notes" label="Notes or special requirements" wide>
              <Textarea id="notes" name="notes" defaultValue={str(fields, "notes")} />
            </Field>
          </div>
        ) : null}

        {path === "partner" && step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Primary contact name">
              <Input id="name" name="name" required autoComplete="name" defaultValue={str(fields, "name")} />
            </Field>
            <Field id="role" label="Role / title">
              <Input id="role" name="role" required defaultValue={str(fields, "role")} />
            </Field>
            <Field id="email" label="Email">
              <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={str(fields, "email")} />
            </Field>
            <Field id="phone" label="Phone">
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" defaultValue={str(fields, "phone")} />
            </Field>
            <Field id="contactTime" label="Preferred contact time">
              <Select id="contactTime" name="contactTime" required defaultValue={str(fields, "contactTime", "afternoon")}>
                {CONTACT_TIMES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="contactMethod" label="Preferred contact method">
              <Select id="contactMethod" name="contactMethod" defaultValue={str(fields, "contactMethod", "email")}>
                {CONTACT_METHODS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}

        {path === "driver" && step === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="fullName" label="Full name" wide>
              <Input id="fullName" name="fullName" required autoComplete="name" defaultValue={str(fields, "fullName")} />
            </Field>
            <Field id="email" label="Email">
              <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={str(fields, "email")} />
            </Field>
            <Field id="phone" label="Phone">
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" defaultValue={str(fields, "phone")} />
            </Field>
            <Field id="city" label="City / area served">
              <Input id="city" name="city" required defaultValue={str(fields, "city")} placeholder="Phoenix or San Diego" />
            </Field>
            <Field id="zip" label="ZIP">
              <Input id="zip" name="zip" defaultValue={str(fields, "zip")} autoComplete="postal-code" />
            </Field>
            <Field id="contactTime" label="Preferred contact time">
              <Select id="contactTime" name="contactTime" required defaultValue={str(fields, "contactTime", "afternoon")}>
                {CONTACT_TIMES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="contactMethod" label="Preferred contact method">
              <Select id="contactMethod" name="contactMethod" defaultValue={str(fields, "contactMethod", "phone")}>
                {CONTACT_METHODS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}

        {path === "driver" && step === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="yearsDriving" label="Driving experience">
              <Select id="yearsDriving" name="yearsDriving" required defaultValue={str(fields, "yearsDriving", "")}>
                <option value="" disabled>Select</option>
                {YEARS_DRIVING.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="licenseClass" label="License class">
              <Select id="licenseClass" name="licenseClass" required defaultValue={str(fields, "licenseClass", "d")}>
                {LICENSE_CLASSES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="license" label="Valid driver’s license">
              <Select id="license" name="license" required defaultValue={str(fields, "license", "")}>
                <option value="" disabled>Select</option>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="cert" label="Primary certification">
              <Select id="cert" name="cert" required defaultValue={str(fields, "cert", "none")}>
                {CERTIFICATIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Checkset legend="Additional certifications" name="certs" options={CERTIFICATIONS} fields={fields} />
            </div>
            <Field id="courierExp" label="Medical courier experience">
              <Select id="courierExp" name="courierExp" defaultValue={str(fields, "courierExp", "no")}>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="logisticsExp" label="Delivery / logistics experience">
              <Select id="logisticsExp" name="logisticsExp" defaultValue={str(fields, "logisticsExp", "yes")}>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="vehicle" label="Vehicle">
              <Select id="vehicle" name="vehicle" defaultValue={str(fields, "vehicle", "pega1")}>
                {VEHICLE_TYPES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="insurance" label="Auto insurance">
              <Select id="insurance" name="insurance" required defaultValue={str(fields, "insurance", "")}>
                <option value="" disabled>Select</option>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="accidents" label="At-fault accidents (3 years)">
              <Select id="accidents" name="accidents" defaultValue={str(fields, "accidents", "no")}>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <Field id="training" label="Willing to complete HIPAA / BBP training">
              <Select id="training" name="training" defaultValue={str(fields, "training", "yes")}>
                {YES_NO.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>
            <label className="sm:col-span-2 flex items-start gap-3 rounded-md bg-elevated p-4 text-sm text-muted shadow-[0_0_0_1px_var(--color-line)]">
              <Checkbox id="background" name="background" value="yes" defaultChecked={selected(fields, "background", "yes")} />
              <span>
                I acknowledge that a background check may be required before I operate as a Pegasus driver.
              </span>
            </label>
          </div>
        ) : null}

        {path === "driver" && step === 2 ? (
          <div className="grid gap-5">
            <Field id="availability" label="Availability" wide>
              <Textarea id="availability" name="availability" required placeholder="Days, hours, on-call windows" defaultValue={str(fields, "availability")} />
            </Field>
            <Checkset legend="Preferred work type" name="work" options={DRIVER_WORK} fields={fields} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="startWhen" label="Can start">
                <Select id="startWhen" name="startWhen" required defaultValue={str(fields, "startWhen", "2w")}>
                  {START_WHEN.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="nights" label="Nights / weekends">
                <Select id="nights" name="nights" defaultValue={str(fields, "nights", "yes")}>
                  {YES_NO.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
              <Field id="coverage" label="Market coverage" wide>
                <Select id="coverage" name="coverage" defaultValue={str(fields, "coverage", "east-valley")}>
                  {COVERAGE.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field id="notes" label="Notes" wide>
              <Textarea id="notes" name="notes" defaultValue={str(fields, "notes")} />
            </Field>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm text-gold">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {step > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setError(null);
                setStep((s) => s - 1);
              }}
            >
              Back
            </Button>
          ) : null}
          <Button type="submit" disabled={submitting}>
            {step < 2
              ? "Continue"
              : submitting
                ? "Submitting…"
                : path === "partner"
                  ? "Apply as a Medical Partner"
                  : "Apply as a Driver"}
          </Button>
        </div>
      </form>
    </div>
  );
}
