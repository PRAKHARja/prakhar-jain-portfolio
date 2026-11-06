import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Contact", "Contact Prakhar Jain about a software role, website or application project.", "/contact");

export default function ContactPage() {
  return <section className="page-section container contact-page"><div className="contact-intro"><span className="eyebrow"><i />CONTACT</span><h1>Let’s start a<br /><em>conversation.</em></h1><p>For Salesforce development, full-stack software, or data-focused work, connect with me through email or my professional profiles.</p><div className="contact-links"><a href={`mailto:${site.email}`}><span>Email</span><b>{site.email} ↗</b></a><a href={site.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>View profile ↗</b></a><a href={site.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>View profile ↗</b></a><div><span>Location</span><b>{site.location}</b></div></div></div><div className="contact-form-wrap"><div className="form-heading"><span className="eyebrow-small">EMAIL ENQUIRY</span><h2>Send a message.</h2><p>Submitting the form prepares a draft in your email app.</p></div><ContactForm /></div></section>;
}
