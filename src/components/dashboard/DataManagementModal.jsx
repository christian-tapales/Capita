import React, { useState, useRef } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { exportTransactionsToCSV } from '../../utils/exportCsv';
import { exportStateToJson, validateAndParseBackupJson } from '../../utils/backup';
import {
  Download,
  Upload,
  RotateCcw,
  Trash2,
  FileSpreadsheet,
  FileJson,
  CheckCircle2,
  AlertTriangle,
  Database,
} from 'lucide-react';

export function DataManagementModal({ isOpen, onClose }) {
  const storeState = useFinanceStore();
  const fileInputRef = useRef(null);

  const [notification, setNotification] = useState(null); // { type: 'success'|'error', message: string }
  const [confirmAction, setConfirmAction] = useState(null); // 'reset' | 'clear' | null
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleExportCSV = () => {
    try {
      if (storeState.transactions.length === 0) {
        showNotification('error', 'No transactions found to export.');
        return;
      }
      exportTransactionsToCSV(storeState.transactions, storeState.currency);
      showNotification('success', `Exported ${storeState.transactions.length} transactions to CSV.`);
    } catch (err) {
      showNotification('error', err.message || 'Failed to export CSV.');
    }
  };

  const handleExportJSON = () => {
    try {
      exportStateToJson(storeState);
      showNotification('success', 'Full backup JSON downloaded successfully.');
    } catch (err) {
      showNotification('error', err.message || 'Failed to create backup.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      setIsProcessing(false);
      const content = event.target?.result;
      const result = validateAndParseBackupJson(content);

      if (!result.isValid) {
        showNotification('error', result.error || 'Invalid backup file.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // Apply imported state
      storeState.importBackupData(result.data);
      showNotification(
        'success',
        `Successfully restored ${result.data.transactions.length} transactions!`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.onerror = () => {
      setIsProcessing(false);
      showNotification('error', 'Failed to read file from disk.');
    };

    reader.readAsText(file);
  };

  const handleConfirmAction = () => {
    if (confirmAction === 'reset') {
      storeState.resetToSampleData();
      showNotification('success', 'Reset state to default demo transactions.');
    } else if (confirmAction === 'clear') {
      storeState.clearAllTransactions();
      showNotification('success', 'All transaction history cleared.');
    }
    setConfirmAction(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setConfirmAction(null);
        onClose();
      }}
      title="Data Portability & Backup"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Status Notification */}
        {notification && (
          <div
            className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Confirmation State */}
        {confirmAction ? (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2.5 text-rose-400 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm {confirmAction === 'reset' ? 'Demo Reset' : 'Data Deletion'}</span>
            </div>
            <p className="text-xs text-slate-300">
              {confirmAction === 'reset'
                ? 'This will replace your current transactions with realistic sample demo data. Any custom entries will be lost unless backed up.'
                : 'Are you sure you want to delete ALL transactions? This action is permanent and cannot be undone.'}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant={confirmAction === 'clear' ? 'danger' : 'primary'}
                onClick={handleConfirmAction}
              >
                Yes, {confirmAction === 'reset' ? 'Reset Demo' : 'Delete Everything'}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Section 1: Export Data */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Export Data
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex flex-col p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-slate-200">Export CSV</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Download spreadsheet compatible with Excel, Google Sheets, or Numbers.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="flex flex-col p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileJson className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-slate-200">Backup JSON</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Full backup of all transactions, preferences, and budget limits.
                  </p>
                </button>
              </div>
            </div>

            {/* Section 2: Restore / Import Backup */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Restore from JSON Backup
                </h4>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="backup-file-input"
                />
                <label
                  htmlFor="backup-file-input"
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-all text-xs font-medium text-slate-300 hover:text-white"
                >
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>{isProcessing ? 'Processing backup...' : 'Choose JSON Backup File to Restore'}</span>
                </label>
              </div>
            </div>

            {/* Section 3: Data Safety & Reset Controls */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Data Reset & Management
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  size="sm"
                  variant="ghost"
                  icon={RotateCcw}
                  onClick={() => setConfirmAction('reset')}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  Load Demo Data
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  icon={Trash2}
                  onClick={() => setConfirmAction('clear')}
                  className="text-xs"
                >
                  Clear All Data
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-800/80">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setConfirmAction(null);
              onClose();
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
