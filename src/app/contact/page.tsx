import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Contact", "Contact Prakhar Jain about a software role, website or application project.", "/contact");

export default function ContactPage() {
  return <section className="page-section container contact-page"><div className="contact-intro"><span className="eyebrow"><i />CONTACT</span><h1>Good work starts<br />with a <em>conversation.</em></h1><p>Share what you’re looking to build or improve. I’ll follow up to understand the scope and next steps.</p><div className="contact-links"><a href={site.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Visit profile ↗</b></a><div><span>Email</span><b>Email address to add</b></div><div><span>GitHub</span><b>Verified URL to add</b></div></div><p className="contact-note">The project form below does not send or store messages. Add a verified email to enable an email draft.</p></div><div className="contact-form-wrap"><div className="form-heading"><span className="eyebrow-small">PROJECT ENQUIRY</span><h2>Tell me a little more.</h2><p>All fields are required. The form is not transmitted or stored.</p></div><ContactForm /></div></section>;
}
