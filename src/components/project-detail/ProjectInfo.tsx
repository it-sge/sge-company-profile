"use client";

import { motion } from "framer-motion";

interface ProjectInfoProps {
  info: {
    client: string;
    industry: string;
    projectType: string;
    installation: string;
    duration: string;
    epcContractor: string;
    warranty: string;
    monitoring: string;
  };
}

export default function ProjectInfo({ info }: ProjectInfoProps) {
  const fields = [
    { label: "Client", value: info.client },
    { label: "Industry", value: info.industry },
    { label: "Project Type", value: info.projectType },
    { label: "Installation Method", value: info.installation },
    { label: "Project Duration", value: info.duration },
    { label: "EPC Contractor", value: info.epcContractor },
    { label: "Warranty", value: info.warranty },
    { label: "Monitoring System", value: info.monitoring },
  ];

  // Filter out empty fields
  const filledFields = fields.filter(f => f.value && f.value.trim() !== '');

  // Hide entire section if no fields have values
  if (filledFields.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Project Information</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-sm max-w-4xl mx-auto">
        <table className="w-full text-left text-sm md:text-base border-collapse">
          <tbody>
            {filledFields.map((field, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-300 last:border-0">
                <th className="py-4 px-6 md:px-8 font-semibold text-gray-700 w-1/2 md:w-1/3 bg-gray-50/80 border-r border-gray-300 align-top">
                  {field.label}
                </th>
                <td className="py-4 px-6 md:px-8 text-navy font-bold">
                  {field.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

