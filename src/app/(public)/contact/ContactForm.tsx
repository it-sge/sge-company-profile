"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { submitContactForm } from "./actions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      toast.success("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.message || "Failed to send message. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
        <input 
          type="text"
          name="name"
          required
          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-slate-50 focus:bg-white shadow-sm"
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
        <input 
          type="email"
          name="email"
          required
          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-slate-50 focus:bg-white shadow-sm"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Phone Number</label>
        <input 
          type="tel"
          name="phone"
          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-slate-50 focus:bg-white shadow-sm"
          placeholder="+62 812 3456 7890"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Message</label>
        <textarea 
          name="message"
          required
          rows={5}
          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-slate-50 focus:bg-white shadow-sm resize-none"
          placeholder="Tell us about your project requirements..."
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-navy-dark font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        <span>Send Message</span>
      </button>
    </form>
  );
}
