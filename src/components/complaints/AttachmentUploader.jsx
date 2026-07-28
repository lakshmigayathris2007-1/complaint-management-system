import React, { useRef, useState } from 'react';
import { MAX_ATTACHMENTS, MAX_ATTACHMENT_SIZE_MB, ACCEPTED_ATTACHMENT_TYPES } from '../../constants';
import { formatFileSize } from '../../utils/formatters';

// Note: in mock mode we only keep file metadata (name/size), not the binary.
// When wiring a real backend, swap the onChange handler to upload to your
// file storage endpoint and store the returned URL instead.
export default function AttachmentUploader({ files, onChange }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  function handleFiles(fileList) {
    setError('');
    const incoming = Array.from(fileList);

    if (files.length + incoming.length > MAX_ATTACHMENTS) {
      setError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    const accepted = [];
    for (const file of incoming) {
      if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
        setError('Only PNG, JPG, or PDF files are supported.');
        continue;
      }
      if (file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024) {
        setError(`Each file must be under ${MAX_ATTACHMENT_SIZE_MB}MB.`);
        continue;
      }
      accepted.push({ name: file.name, size: file.size });
    }

    if (accepted.length) {
      onChange([...files, ...accepted]);
    }
  }

  function removeFile(index) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-ink">Attachments</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="rounded border border-dashed border-border bg-surface px-4 py-6 text-center"
      >
        <p className="text-sm text-ink-muted">
          Drag files here, or{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            browse
          </button>
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          PNG, JPG, or PDF · up to {MAX_ATTACHMENT_SIZE_MB}MB each · max {MAX_ATTACHMENTS} files
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_ATTACHMENT_TYPES.join(',')}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-xs text-accent" role="alert">{error}</p>}

      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded border border-border bg-surface px-3 py-2 text-sm">
              <span className="truncate text-ink">{file.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-muted">{formatFileSize(file.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                  className="text-ink-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
