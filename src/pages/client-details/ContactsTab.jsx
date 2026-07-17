import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/base/buttons/button';
import { Plus } from '@untitledui/icons';

export default function ContactsTab() {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/contacts`);
        if (!res.ok) throw new Error('Failed to fetch contacts');
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-lg">Contacts</h3>
        <Button color="secondary" size="sm" iconLeading={Plus}>
          Add Contact
        </Button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-border">
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Contact Name</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Role / Position</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Decision Maker</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-12"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                    No contacts added yet.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary font-medium">{contact.role}</div>
                      <div className="text-sm text-text-secondary">{contact.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">{contact.phone}</div>
                      <div className="text-sm text-text-secondary">{contact.email}</div>
                      <div className="text-sm text-text-tertiary">LINE: {contact.lineId} (Prefers: {contact.preferredChannel})</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {contact.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {contact.isDecisionMaker ? (
                        <span className="px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full border border-brand-200">Yes</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary max-w-xs truncate" title={contact.note}>
                      {contact.note}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
