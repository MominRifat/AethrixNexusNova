"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Clock,
  Key,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <Section
      id="contact"
      variant="bg-0"
      eyebrow="Conversion Matrix"
      title="Let's engineer what's next."
      description="Initiate a direct technical discovery session with our principal solutions architects. Guaranteed response within 24 business hours."
      withTopDivider
      className="relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-[#ffd426]/5 rounded-full blur-[140px]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch items-start mt-6">
        {/* Left Column: Direct Commitments, Credentials & Quick Booking */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="h-full flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#140f09] border border-white/[0.08]">
            <div className="space-y-3.5">
              <div>
                <Badge className="bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30 mb-2 text-[11px] py-0.5 px-2.5">
                  Enterprise SLA Protocol
                </Badge>
                <h3 className="font-heading text-xl font-bold text-[#f5f3ee] tracking-tight">
                  Direct Access to Principal Architects
                </h3>
                <p className="mt-1.5 text-xs text-[#b7ae9c] leading-relaxed">
                  Skip account executives and sales layers. Your inquiry is reviewed directly by systems engineers capable of architecting your production stack.
                </p>
              </div>

              {/* Commitments & Trust Badges */}
              <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                {SITE_CONFIG.commitments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5">
                    <div className="p-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[#ffd426] shrink-0 mt-0.5">
                      {c.id === "nda" && <Shield className="h-3.5 w-3.5" />}
                      {c.id === "sla" && <Clock className="h-3.5 w-3.5" />}
                      {c.id === "ip" && <Key className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#f5f3ee]">
                        {c.title}
                      </h4>
                      <p className="text-[11px] text-[#b7ae9c] leading-tight mt-0.5">
                        {c.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Contact Credentials (Placeholders) */}
              <div className="pt-3 border-t border-white/[0.08] space-y-1.5 font-mono text-[11px] sm:text-xs">
                <div className="flex items-center gap-2.5 text-[#b7ae9c]">
                  <Mail className="h-3.5 w-3.5 text-[#ffd426] shrink-0" />
                  <span>{SITE_CONFIG.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#b7ae9c]">
                  <Phone className="h-3.5 w-3.5 text-[#ffd426] shrink-0" />
                  <span>{SITE_CONFIG.contactPhone}</span>
                </div>
                <div className="flex items-start gap-2.5 text-[#7d7566] text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-[#7d7566] shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.officeLocation}</span>
                </div>
              </div>
            </div>

            {/* Optional Schedule Call Button */}
            <div className="pt-3 border-t border-white/[0.08] mt-3">
              <a
                href={SITE_CONFIG.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-[#ffd426]/50 hover:bg-white/[0.07] font-mono text-xs text-[#f5f3ee] transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#ffd426]" />
                <span>Schedule a 30-Min Discovery Session</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#7d7566]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
