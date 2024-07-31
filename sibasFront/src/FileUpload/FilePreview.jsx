import React, { useEffect, useState } from 'react';

function FilePreview({ file }) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div style={{ height: '100%' }}>
      {file.type.startsWith('image/') ? (
        <img style={{ height: '100%' }} src={preview} alt="File Preview" />
      ) : (
        <p>File type not supported for preview</p>
      )}
    </div>
  );
}

export default FilePreview;
