"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Building2,
  Mail,
  User,
  FileText,
  DollarSign,
  RotateCcw,
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BUDGET_BANDS } from "@/lib/estimator-config";
import { subscribeContactPrefill } from "@/lib/contact-prefill";
import { cn } from "@/lib/utils";

const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [scope, setScope] = useState("");
  const [budget, setBudget] = useState(BUDGET_BANDS[0].id);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Free email domain warning check
  const isFreeEmail = FREE_EMAIL_DOMAINS.some((domain) =>
    email.toLowerCase().includes(`@${domain}`)
  );

  // Sync with live prefill events from Lab / Estimator upon explicit button click
  useEffect(() => {
    // Clear any legacy test data from earlier sessions
    try {
      sessionStorage.removeItem("aethrix_contact_prefill_data");
      sessionStorage.removeItem("aethrix_consultation_prefill");
    } catch {
      // Ignore
    }

    const unsubscribe = subscribeContactPrefill((data) => {
      if (data.scopeText) setScope(data.scopeText);
      if (data.budgetBand) setBudget(data.budgetBand);
    });

    return () => unsubscribe();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Full name is required (at least 2 characters).";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please provide a valid corporate email address.";
    }
    if (!company.trim() || company.trim().length < 2) {
      errs.company = "Company or institutional name is required.";
    }
    if (!scope.trim() || scope.trim().length < 10) {
      errs.scope = "Please describe your architecture scope (at least 10 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          scope: scope.trim(),
          budget,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit consultation request.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Network error. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setScope("");
    setBudget(BUDGET_BANDS[1].id);
    setErrors({});
    setIsSuccess(false);
    setServerError(null);
  };

  if (isSuccess) {
    return (
      <div className="h-full p-8 sm:p-10 rounded-3xl bg-[#140f09] border border-[#34d399]/40 shadow-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="h-16 w-16 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center mb-5 text-[#34d399]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h3 className="font-heading text-2xl font-bold text-[#f5f3ee]">
          Discovery Inquiry Received
        </h3>
        <p className="mt-2 text-sm text-[#b7ae9c] max-w-md leading-relaxed">
          Your project specification has been routed to our Principal Solutions Architect team. A technical discovery lead will contact you at <span className="text-[#ffd426] font-mono">{email}</span> within 24 hours.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[#7d7566] text-left w-full max-w-md">
          <div className="text-[#34d399] font-bold mb-1">DISCOVERY PROTOCOL // QUEUED</div>
          <div>Target SLA: Under 24 Business Hours</div>
          <div>Direct Routing: Enterprise Solutions Group</div>
        </div>

        <button
          onClick={handleReset}
          className="mt-6 flex items-center gap-1.5 text-xs font-mono text-[#b7ae9c] hover:text-[#ffd426] transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Submit another technical inquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="h-full flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#140f09] border border-white/[0.12] shadow-2xl"
    >
      <div className="space-y-3.5">
        {/* Honeypot field (hidden from humans, bot detection) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hp_field">Do not fill</label>
          <input
            id="hp_field"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-mono text-[#ffd426] uppercase font-semibold mb-1.5"
            >
              Your Name <span className="text-[#f87171]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#7d7566]" />
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="e.g. Dr. Julian Vance"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn(
                  "w-full rounded-xl bg-[#1a140d] border pl-10 pr-3.5 py-2.5 text-sm text-[#f5f3ee] placeholder-[#7d7566] focus:outline-none transition-colors",
                  errors.name ? "border-[#f87171]" : "border-white/[0.08] focus:border-[#ffd426]"
                )}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-[#f87171] font-mono">
                {errors.name}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="contact-company"
              className="block text-xs font-mono text-[#ffd426] uppercase font-semibold mb-1.5"
            >
              Company / Organization <span className="text-[#f87171]">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-[#7d7566]" />
              <input
                id="contact-company"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: "" }));
                }}
                placeholder="e.g. Cerner Health / Stripe"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
                className={cn(
                  "w-full rounded-xl bg-[#1a140d] border pl-10 pr-3.5 py-2.5 text-sm text-[#f5f3ee] placeholder-[#7d7566] focus:outline-none transition-colors",
                  errors.company ? "border-[#f87171]" : "border-white/[0.08] focus:border-[#ffd426]"
                )}
              />
            </div>
            {errors.company && (
              <p id="company-error" className="mt-1 text-xs text-[#f87171] font-mono">
                {errors.company}
              </p>
            )}
          </div>
        </div>

        {/* Corporate Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono text-[#ffd426] uppercase font-semibold mb-1.5"
          >
            Corporate Work Email <span className="text-[#f87171]">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#7d7566]" />
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="julian.vance@enterprise.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "w-full rounded-xl bg-[#1a140d] border pl-10 pr-3.5 py-2.5 text-sm text-[#f5f3ee] placeholder-[#7d7566] focus:outline-none transition-colors",
                errors.email ? "border-[#f87171]" : "border-white/[0.08] focus:border-[#ffd426]"
              )}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-[#f87171] font-mono">
              {errors.email}
            </p>
          )}
          {/* Friendly non-blocking free email warning */}
          {isFreeEmail && !errors.email && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-[#ffd426]/90">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Note: Corporate work domain preferred for prioritized enterprise SLA response.</span>
            </div>
          )}
        </div>

        {/* Budget Band Select */}
        <div>
          <label
            htmlFor="contact-budget"
            className="block text-xs font-mono text-[#ffd426] uppercase font-semibold mb-1.5"
          >
            Indicative Investment Bracket
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-[#7d7566]" />
            <select
              id="contact-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl bg-[#1a140d] border border-white/[0.08] pl-10 pr-3.5 py-2.5 text-sm text-[#f5f3ee] focus:outline-none focus:border-[#ffd426] transition-colors appearance-none cursor-pointer"
            >
              {BUDGET_BANDS.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#140f09] text-[#f5f3ee]">
                  {b.range} — {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Scope Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="contact-scope"
              className="block text-xs font-mono text-[#ffd426] uppercase font-semibold"
            >
              Project Scope & Technical Bottlenecks <span className="text-[#f87171]">*</span>
            </label>
            <span className="text-[10px] font-mono text-[#7d7566]">
              {scope.length}/2000 chars
            </span>
          </div>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 h-4 w-4 text-[#7d7566]" />
            <textarea
              id="contact-scope"
              value={scope}
              onChange={(e) => {
                setScope(e.target.value.slice(0, 2000));
                if (errors.scope) setErrors((prev) => ({ ...prev, scope: "" }));
              }}
              rows={4}
              placeholder="Outline your architectural goals, current throughput/latency bottlenecks, or compliance constraints..."
              aria-invalid={Boolean(errors.scope)}
              aria-describedby={errors.scope ? "scope-error" : undefined}
              className={cn(
                "w-full rounded-xl bg-[#1a140d] border pl-10 pr-3.5 py-2.5 text-sm text-[#f5f3ee] placeholder-[#7d7566] focus:outline-none transition-colors resize-none leading-relaxed",
                errors.scope ? "border-[#f87171]" : "border-white/[0.08] focus:border-[#ffd426]"
              )}
            />
          </div>
          {errors.scope && (
            <p id="scope-error" className="mt-1 text-xs text-[#f87171] font-mono">
              {errors.scope}
            </p>
          )}
        </div>

        {/* Server Error Message */}
        {serverError && (
          <div className="p-3 rounded-xl bg-[#f87171]/10 border border-[#f87171]/20 text-xs font-mono text-[#f87171] flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}
      </div>

      {/* Submit Button & Subtext */}
      <div className="pt-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-200 select-none",
            isSubmitting
              ? "bg-white/[0.05] text-[#7d7566] border border-white/[0.08] cursor-not-allowed"
              : "bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] text-[#0a0805] hover:shadow-[0_0_24px_rgba(255,212,38,0.35)] active:scale-95"
          )}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="xs" />
              <span>Transmitting Architecture Spec...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 text-[#0a0805]" />
              <span>Initiate Discovery Consultation</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-[#7d7566] font-mono text-center pt-2">
          🔒 All inquiries protected under mutual non-disclosure protocols.
        </p>
      </div>
    </form>
  );
}
