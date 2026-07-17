import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/base/buttons/button';
import { Plus, Download01 } from '@untitledui/icons';

export default function DocumentsTab() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/documents`);
        if (!res.ok) throw new Error('Failed to fetch documents');
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-lg">Documents</h3>
        <Button color="secondary" size="sm" iconLeading={Plus}>
          Upload Document
        </Button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-border">
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Related Campaign</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-10 ml-auto"></div></td>
                  </tr>
                ))
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-brand-600 hover:underline cursor-pointer">{doc.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {doc.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {doc.campaign}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {doc.uploadedBy} <br/> <span className="text-xs text-text-tertiary">{doc.uploadedDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button color="tertiary" size="sm" iconLeading={Download01} title="Download" />
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
